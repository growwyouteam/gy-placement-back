# 📦 Database Setup Guide

## 🚀 Quick Start - Jobs Ko Database Mein Save Karo

### Option 1: Fresh Start (Recommended)
Purane jobs delete karke naye jobs add karo:

```bash
cd backend
npm run reset
```

**Ye kya karega:**
- ✅ Purane saare jobs delete karega
- ✅ 6 fresh jobs add karega
- ✅ Jobs list dikhayega

### Option 2: Seed Only
Agar database empty hai to jobs add karo:

```bash
cd backend
npm run seed
```

**Note:** Agar jobs already exist karte hain to ye kuch nahi karega.

---

## 📋 Jobs Jo Add Hongi

1. **Sales Executive** - Agra
2. **Telecaller** - Agra
3. **Electronic Engineer** - Delhi NCR
4. **Operator & Executive** - Noida
5. **Mechanical Engineer** - Agra
6. **Electrical Engineer** - Delhi NCR

---

## ✅ Verify Karo

### Step 1: Database Check
Script run karne ke baad ye output dikhega:
```
✅ Successfully added 6 jobs!

📋 Jobs in database:
   1. Sales Executive - Agra
   2. Telecaller - Agra
   3. Electronic Engineer - Delhi NCR
   4. Operator & Executive - Noida
   5. Mechanical Engineer - Agra
   6. Electrical Engineer - Delhi NCR
```

### Step 2: Server Start Karo
```bash
npm run dev
```

### Step 3: Browser Mein Check Karo
1. Frontend open karo (Live Server se)
2. Homepage pe 6 jobs dikhni chahiye
3. Jobs page pe saari jobs dikhni chahiye

---

## 🔧 Troubleshooting

### Problem: "MongoDB connection error"
**Solution:**
- Internet connection check karo
- `.env` file mein `MONGODB_URI` check karo

### Problem: "Jobs already exist"
**Solution:**
```bash
npm run reset
```
Ye purane jobs delete karke fresh add karega.

### Problem: "Module not found"
**Solution:**
```bash
npm install
```

---

## 📝 Manual Verification

MongoDB Atlas mein check karne ke liye:
1. MongoDB Atlas login karo
2. Cluster → Browse Collections
3. Database: `growwyou_db`
4. Collection: `jobs`
5. 6 documents dikhne chahiye

---

## 🎯 Next Steps

1. ✅ Database seed karo: `npm run reset`
2. ✅ Server start karo: `npm run dev`
3. ✅ Frontend open karo
4. ✅ Jobs load hote dekho! 🎉
