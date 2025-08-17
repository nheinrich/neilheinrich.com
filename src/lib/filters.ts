/**
 * Filter System Type Definitions
 * 
 * This file contains the master lists and types for the blog's filtering system.
 * All collections and topics must be defined here to ensure type safety.
 */

// Master Collections List
export const COLLECTIONS = [
  'Mabel',
  'Skelly'
] as const

// Master Topics List  
export const TOPICS = [
  'AI',
  'Design',
  'Dev', 
  'Discovery',
  'Mind',
  'Teams'
] as const

// Master Formats List (from existing content schema)
export const FORMATS = [
  'Essay',
  'Experiment', 
  'Note'
] as const

// Type Definitions
export type Collection = typeof COLLECTIONS[number]
export type Topic = typeof TOPICS[number]  
export type Format = typeof FORMATS[number]

// Filter State Interface
export interface FilterState {
  collections: Collection[]
  topics: Topic[]
  format: Format | 'all'
}

// URL Query Parameters Interface
export interface FilterParams {
  collections?: string
  topics?: string
  format?: string
}

// Utility Functions
export function isValidCollection(value: string): value is Collection {
  return COLLECTIONS.includes(value as Collection)
}

export function isValidTopic(value: string): value is Topic {
  return TOPICS.includes(value as Topic)
}

export function isValidFormat(value: string): value is Format {
  return FORMATS.includes(value as Format)
}

// Parse collections from URL parameter string (case-insensitive)
export function parseCollections(param: string | null): Collection[] {
  if (!param) return []
  return param.split(',')
    .map(c => c.trim())
    .map(c => {
      // Find matching collection (case-insensitive)
      const match = COLLECTIONS.find(collection => 
        collection.toLowerCase() === c.toLowerCase()
      )
      return match
    })
    .filter((c): c is Collection => c !== undefined)
}

// Parse topics from URL parameter string (case-insensitive)
export function parseTopics(param: string | null): Topic[] {
  if (!param) return []
  return param.split(',')
    .map(t => t.trim())
    .map(t => {
      // Find matching topic (case-insensitive)
      const match = TOPICS.find(topic => 
        topic.toLowerCase() === t.toLowerCase()
      )
      return match
    })
    .filter((t): t is Topic => t !== undefined)
}

// Parse format from URL parameter string (case-insensitive)
export function parseFormat(param: string | null): Format | 'all' {
  if (!param) return 'all'
  if (param.toLowerCase() === 'all') return 'all'
  
  // Find matching format (case-insensitive)
  const match = FORMATS.find(format => 
    format.toLowerCase() === param.toLowerCase()
  )
  return match || 'all'
}

// Convert filter arrays back to URL parameter strings (lowercase)
export function serializeCollections(collections: Collection[]): string {
  return collections.map(c => c.toLowerCase()).join(',')
}

export function serializeTopics(topics: Topic[]): string {
  return topics.map(t => t.toLowerCase()).join(',')
}

// URL State Management
let updateTimeout: ReturnType<typeof setTimeout> | null = null

// Parse current filter state from URL
export function parseURLFilters(): FilterState {
  if (typeof window === 'undefined') {
    return { collections: [], topics: [], format: 'all' }
  }
  
  const url = new URL(window.location.href)
  const params = url.searchParams
  
  return {
    collections: parseCollections(params.get('collections')),
    topics: parseTopics(params.get('topics')),
    format: parseFormat(params.get('format'))
  }
}

// Update URL with current filter state (debounced)
export function updateURL(filterState: FilterState): void {
  if (typeof window === 'undefined') return
  
  // Clear any pending updates
  if (updateTimeout !== null) {
    clearTimeout(updateTimeout)
  }
  
  // Debounce URL updates to prevent history spam
  updateTimeout = setTimeout(() => {
    const url = new URL(window.location.href)
    
    // Clear all existing params (replace entirely)
    url.search = ''
    
    // Add filter params if they have values
    if (filterState.collections.length > 0) {
      url.searchParams.set('collections', serializeCollections(filterState.collections))
    }
    
    if (filterState.topics.length > 0) {
      url.searchParams.set('topics', serializeTopics(filterState.topics))
    }
    
    if (filterState.format !== 'all') {
      url.searchParams.set('format', filterState.format.toLowerCase())
    }
    
    // Update URL without page refresh
    window.history.pushState({}, '', url.toString())
    updateTimeout = null
  }, 300) // 300ms debounce
}

// Listen for browser back/forward navigation
export function onURLChange(callback: (filterState: FilterState) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }
  
  function handlePopState() {
    const filterState = parseURLFilters()
    callback(filterState)
  }
  
  window.addEventListener('popstate', handlePopState)
  
  // Return cleanup function
  return () => {
    window.removeEventListener('popstate', handlePopState)
  }
}

// Initialize filter state from URL or defaults
export function initializeFilterState(): FilterState {
  return parseURLFilters()
}

// Content Filtering Logic

// Post data structure (based on ContentList.svelte usage)
export interface PostData {
  title: string
  slug: string
  summary: string
  date: string
  format: string
  collections?: string[]
  topics: string[]
  pinned?: boolean
}

export interface Post {
  data: PostData
  slug: string
}

// Check if post matches collection filters (OR logic within collections)
export function matchesCollections(post: Post, selectedCollections: Collection[]): boolean {
  // If no collections selected, match all posts
  if (selectedCollections.length === 0) return true
  
  // If post has no collections, only match if no collections are selected
  if (!post.data.collections || post.data.collections.length === 0) {
    return false
  }
  
  // Check if post has any of the selected collections (OR logic)
  return selectedCollections.some(collection => 
    post.data.collections!.includes(collection)
  )
}

// Check if post matches topic filters (OR logic within topics)
export function matchesTopics(post: Post, selectedTopics: Topic[]): boolean {
  // If no topics selected, match all posts
  if (selectedTopics.length === 0) return true
  
  // If post has no topics, only match if no topics are selected
  if (!post.data.topics || post.data.topics.length === 0) {
    return false
  }
  
  // Check if post has any of the selected topics (OR logic)
  return selectedTopics.some(topic => 
    post.data.topics.includes(topic)
  )
}

// Check if post matches format filter
export function matchesFormat(post: Post, selectedFormat: Format | 'all'): boolean {
  // If 'all' selected, match all posts
  if (selectedFormat === 'all') return true
  
  // Check exact format match
  return post.data.format === selectedFormat
}

// Main filter function - applies all filters with AND logic between categories
export function filterPosts(posts: Post[], filterState: FilterState): Post[] {
  return posts.filter(post => 
    matchesCollections(post, filterState.collections) &&
    matchesTopics(post, filterState.topics) &&
    matchesFormat(post, filterState.format)
  )
}
