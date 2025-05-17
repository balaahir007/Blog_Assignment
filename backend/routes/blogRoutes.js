import express from 'express';
import {
  getPublishedPostsController,
  getDraftPostsController,
  deleteBlogController,
  createOrUpdateBlogController,
} from '../controllers/blogControllers.js';

const router = express.Router();

// Create a new blog post
router.post('/save-draft', createOrUpdateBlogController);

// Get all published blog posts
router.get('/published', getPublishedPostsController);

// Get all draft blog posts
router.post('/drafts', getDraftPostsController);

// Delete a blog post
router.delete('/:id', deleteBlogController);

export default router;
