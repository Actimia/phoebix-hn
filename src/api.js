const API_BASE = 'https://hacker-news.firebaseio.com/v0/'

export function get (path) {
  return fetch(API_BASE + path + '.json').then(response => response.json()).catch(console.err)
}
