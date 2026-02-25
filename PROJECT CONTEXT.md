PROJECT CONTEXT — DocNo Application

We are continuing from a recovery session.

Project: DocNo (Document Number Generator)
Stack:

* Backend: Node.js + Express + MySQL
* Auth: JWT
* Frontend: React + Vite + Tailwind

Stable Git Baseline:
commit 3221a15 — "Stable reset-password flow working"

Current Status:
✅ Backend running on :7050
✅ /health endpoint OK
✅ Login API working (returns JWT + user)
✅ Frontend login working
✅ Admin dashboard renders with styling
✅ Tailwind CSS restored
✅ User dashboard working

Remaining Issue:
Document generation endpoint returns:

{"error":"Invalid or expired token"}

Token exists in localStorage, so likely Authorization header is not being attached consistently by axios.

Goal for this session:

1. Verify JWT flow end-to-end
2. Ensure single axios instance with interceptor
3. Fix document generation authentication
4. Continue development from stable architecture (no restructuring)

Important:
We DO NOT want refactoring or structural rewrites — only stabilization and incremental fixes.
