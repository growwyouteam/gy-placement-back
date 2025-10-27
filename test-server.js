console.log('Testing server...');

try {
    require('dotenv').config();
    console.log('✅ dotenv loaded');
    
    const express = require('express');
    console.log('✅ express loaded');
    
    const bcrypt = require('bcryptjs');
    console.log('✅ bcryptjs loaded');
    
    const jwt = require('jsonwebtoken');
    console.log('✅ jsonwebtoken loaded');
    
    const mongoose = require('mongoose');
    console.log('✅ mongoose loaded');
    
    console.log('\n📊 Environment variables:');
    console.log('PORT:', process.env.PORT);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
    console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');
    
    console.log('\n✅ All packages loaded successfully!');
    console.log('Now trying to start actual server...\n');
    
    require('./server.js');
} catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
}
