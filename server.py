#!/usr/bin/env python3
"""
Local Dev Server for Akash Bora Portfolio
Serves static assets, handles clean /admin routes, and mocks/proxies Vercel serverless /api/ endpoints.
"""

import http.server
import socketserver
import json
import urllib.parse
import os
import sys
import datetime

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Local mock in-memory database for inquiries during local testing
LOCAL_DB = [
    {
        "id": "inq_sample_01",
        "name": "Sarah Jenkins (Senior Talent Partner)",
        "email": "sarah.jenkins@cloudscale.io",
        "subject": "Staff Cloud & DevOps Engineer Opportunity",
        "topic": "Full-time DevOps Role",
        "message": "Hi Akash, we reviewed your AWS Certified Solutions Architect Professional credential and ArgoCD GitOps architecture. We would love to discuss our high-growth platform engineering role with you!",
        "status": "unread",
        "createdAt": datetime.datetime.now().isoformat()
    }
]

class PortfolioHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Clean /admin route redirect
        if path == '/admin':
            self.send_response(301)
            self.send_header('Location', '/admin/')
            self.end_headers()
            return

        # API: DB Status
        if path == '/api/db-status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            res = {
                "connected": True,
                "database": "neondb",
                "envDetected": "POSTGRES_URL",
                "totalInquiries": len(LOCAL_DB),
                "latencyMs": 24,
                "version": "PostgreSQL 16 (Neon Cloud)",
                "timestamp": datetime.datetime.now().isoformat()
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))
            return

        # API: Messages
        if path == '/api/messages':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            res = {
                "success": True,
                "source": "postgresql",
                "database": "neondb",
                "messages": LOCAL_DB
            }
            self.wfile.write(json.dumps(res).encode('utf-8'))
            return

        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)

        # API: Auth
        if path == '/api/auth':
            try:
                data = json.loads(body.decode('utf-8'))
                passcode = data.get('passcode', '')
                is_valid = (passcode == 'Akash@Cloud2026!')
                self.send_response(200 if is_valid else 401)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                res = {
                    "success": is_valid,
                    "message": "Authenticated" if is_valid else "Invalid security passcode"
                }
                self.wfile.write(json.dumps(res).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
            return

        # API: Contact
        if path == '/api/contact':
            try:
                data = json.loads(body.decode('utf-8'))
                new_inq = {
                    "id": "inq_" + str(int(datetime.datetime.now().timestamp() * 1000)),
                    "name": data.get("name", "Recruiter"),
                    "email": data.get("email", ""),
                    "subject": data.get("subject", "Inquiry"),
                    "topic": data.get("topic", "General Inquiry"),
                    "message": data.get("message", ""),
                    "status": "unread",
                    "createdAt": datetime.datetime.now().isoformat()
                }
                LOCAL_DB.insert(0, new_inq)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                res = {
                    "success": True,
                    "message": "Message saved to PostgreSQL (local mock)",
                    "data": new_inq
                }
                self.wfile.write(json.dumps(res).encode('utf-8'))
            except Exception as e:
                self.send_response(400)
                self.end_headers()
            return

        self.send_response(404)
        self.end_headers()

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        if path == '/api/messages':
            if query.get('clearAll', [''])[0] == 'true':
                LOCAL_DB.clear()
            elif 'id' in query:
                del_id = query['id'][0]
                LOCAL_DB[:] = [m for m in LOCAL_DB if m['id'] != del_id]

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            res = {"success": True, "message": "Inquiry record(s) deleted"}
            self.wfile.write(json.dumps(res).encode('utf-8'))
            return

        self.send_response(404)
        self.end_headers()

    def do_PATCH(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)

        if path == '/api/messages':
            try:
                data = json.loads(body.decode('utf-8'))
                target_id = data.get('id')
                new_status = data.get('status')
                for m in LOCAL_DB:
                    if m['id'] == target_id:
                        m['status'] = new_status
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                res = {"success": True, "message": "Status updated"}
                self.wfile.write(json.dumps(res).encode('utf-8'))
            except Exception:
                self.send_response(400)
                self.end_headers()
            return

        self.send_response(404)
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(('', PORT), PortfolioHandler) as httpd:
        print(f"=== Akash Bora Portfolio Dev Server Running on http://localhost:{PORT} ===")
        print(f"• Main Portfolio:  http://localhost:{PORT}/")
        print(f"• Admin Portal:    http://localhost:{PORT}/admin/")
        print(f"• Passcode:        Akash@Cloud2026!")
        httpd.serve_forever()
