# Jury Members Admin Panel - Error Messages Guide

This document explains all possible error messages you may see in the Jury Members management panel and what they mean.

## Reordering Jury Members Errors

### "Network error: Could not reach the server. Please check your connection."
- **Cause**: No internet connection or server is unreachable
- **Solution**: Check your internet connection and ensure the backend server is running

### "Invalid request: The data format is invalid" (400 Error)
- **Cause**: The reorder data being sent to the server is malformed
- **Solution**: Refresh the page and try again. If it persists, check browser console for details

### "Invalid request: Expected an array of {_id, order} objects" (400 Error)
- **Cause**: The orders data format is incorrect (not an array or missing fields)
- **Solution**: This is a frontend bug - refresh and try again, or contact support

### "Invalid request: Orders array cannot be empty" (400 Error)
- **Cause**: No jury members were provided to reorder
- **Solution**: Make sure you have jury members to reorder

### "Invalid request: Each item must have _id (string) and order (number)" (400 Error)
- **Cause**: One or more jury members have missing or invalid _id or order values
- **Solution**: Refresh the page. This usually indicates corrupted member data

### "Unauthorized: Your session has expired. Please login again." (401 Error)
- **Cause**: Your authentication token is invalid or expired
- **Solution**: Log out and log back in to get a new token

### "Forbidden: You do not have permission to reorder jury members." (403 Error)
- **Cause**: Your user account doesn't have admin permissions
- **Solution**: Log in with an admin account

### "Not found: One or more jury members could not be found." (404 Error)
- **Cause**: A jury member was deleted before reordering completed
- **Solution**: Refresh the page to reload the updated list

### "Server error: [specific error message]" (500 Error)
- **Cause**: The backend server encountered an error while saving
- **Possible solutions**:
  - Check server logs: `tail -f server.log`
  - Ensure MongoDB is running and connected
  - Check if there are database permissions issues
  - Restart the backend server

---

## Creating Jury Members Errors

### "Image upload failed: Could not save the jury member photo. Please try a different image."
- **Cause**: The image file couldn't be uploaded to the server
- **Solution**: 
  - Try a different image file
  - Ensure image is in valid format (JPG, PNG, etc.)
  - Check that image file size is reasonable

### "Invalid data: Please check all required fields" (400 Error)
- **Cause**: One or more required fields (name, email, designation, bio, specialization, image) are empty
- **Solution**: Fill in all required fields before creating

### "Invalid data: Jury member with this email already exists" (400 Error)
- **Cause**: A jury member with that email is already in the system
- **Solution**: Use a unique email address

### "Invalid data: A user with this email already exists" (400 Error)
- **Cause**: Another user (not jury) already has this email in the system
- **Solution**: Contact admin if this is an error, or use a different email

### "Unauthorized: Your session has expired. Please login again." (401 Error)
- **Cause**: Your authentication token is invalid or expired
- **Solution**: Log out and log back in

### "Server error: [specific error message]" (500 Error)
- **Cause**: Backend server encountered an error during creation
- **Possible solutions**:
  - Check server logs for detailed error
  - Ensure MongoDB has storage space
  - Check database connection

---

## Updating Jury Members Errors

### "Image upload failed: Could not save the new photo. Please try a different image."
- **Cause**: The new image couldn't be uploaded
- **Solution**: Try a different image or skip uploading a new image

### "Invalid data: Please check all required fields" (400 Error)
- **Cause**: One or more required fields are empty or invalid
- **Solution**: Ensure all required fields have values

### "Invalid data: [specific validation error]" (400 Error)
- **Cause**: Specific field validation failed
- **Solution**: Check the error details in console or contact support

### "Unauthorized: Your session has expired. Please login again." (401 Error)
- **Cause**: Your authentication token expired
- **Solution**: Log out and log back in

### "Jury member not found: It may have been deleted." (404 Error)
- **Cause**: The jury member was deleted by another admin before you finished editing
- **Solution**: Refresh the page to reload the list

### "Server error: [specific error message]" (500 Error)
- **Cause**: Backend encountered an error (database issue, validation, etc.)
- **Possible solutions**:
  - Check MongoDB connection
  - Review server logs
  - Restart backend if needed

---

## Deleting Jury Members Errors

### "Unauthorized: Your session has expired. Please login again." (401 Error)
- **Cause**: Your session token expired
- **Solution**: Log out and log back in

### "Forbidden: You do not have permission to delete jury members." (403 Error)
- **Cause**: You don't have admin permissions
- **Solution**: Log in with an admin account

### "Jury member not found: It may have already been deleted." (404 Error)
- **Cause**: The member was already deleted
- **Solution**: Refresh the page - it should be removed from the list

### "Server error: [specific error message]" (500 Error)
- **Cause**: Database or server error during deletion
- **Possible solutions**:
  - Check MongoDB connection
  - Review server logs
  - Ensure related data (jury scores) can be deleted

---

## Assigning Products Errors

### "Failed to save product assignments - Invalid products: Some products could not be assigned" (400 Error)
- **Cause**: One or more selected products are invalid
- **Solution**: Select valid products from the list provided

### "Unauthorized: Your session has expired. Please login again." (401 Error)
- **Cause**: Session token expired
- **Solution**: Log out and log back in

### "Jury member not found: It may have been deleted." (404 Error)
- **Cause**: Jury member was deleted before saving assignments
- **Solution**: Refresh the page

### "Server error: [specific error message]" (500 Error)
- **Cause**: Database or server error
- **Possible solutions**:
  - Check server logs
  - Ensure MongoDB is running
  - Restart backend if needed

---

## Loading Jury Members Errors

### "Network error: Could not reach the server. Please check your connection."
- **Cause**: Cannot connect to backend server
- **Solution**:
  - Check internet connection
  - Ensure backend server is running: `npm start` in server directory
  - Check if server is listening on correct port (5001 by default)

### "Unauthorized: Your session has expired. Please login again." (401 Error)
- **Cause**: Token invalid or expired
- **Solution**: Log out and log back in

### "Forbidden: You do not have permission to view jury members." (403 Error)
- **Cause**: Not an admin user
- **Solution**: Log in with admin account

### Error loading jury members: [status code] (Other status codes)
- **Cause**: Various server errors
- **Solution**: Check browser console, check server logs, ensure server is running

---

## General Troubleshooting

### Server Not Running
```bash
cd /Users/kuldeepvyas/Desktop/Home\ Page\ for\ IFDA/server
npm install  # Install dependencies if not done
npm start    # Start the server
```

### Check Server Logs
Look for errors in the terminal where the server is running. Scroll up to see recent errors.

### Browser Console Logs
- Press F12 to open Developer Tools
- Go to Console tab
- You'll see logged error details with full error objects and stack traces

### Database Connection Issues
- Ensure MongoDB is running on your VPS
- Check connection string in `.env` or environment variables
- Verify database credentials

### Clear Browser Cache
Sometimes cached data can cause issues:
1. Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. Clear all cache and cookies
3. Refresh the page
