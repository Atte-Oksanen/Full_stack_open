const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let result = 0
    for (let i = 0; i < blogs.length; i++) {
        result = result + blogs[i].likes
    }
    return result
}

const favoriteBlog = (blogs) => {
    let top = blogs[0]
    for (let i = 1; i < blogs.length; i++) {
        if (top.likes < blogs[i].likes) {
            top = blogs[i]
        }
    }
    return top
}

const mostBlogs = (blogs) => {
    const writers = new Map()
    for (let i = 0; i < blogs.length; i++) {
        if (writers.has(blogs[i].author)) {
            writers.set(blogs[i].author, writers.get(blogs[i].author) + 1)
        } else {
            writers.set(blogs[i].author, 1)
        }
    }
    const highest = ([...writers.entries()].reduce((a, e) => e[1] > a[1] ? e : a))
    
    return {
        author: highest[0],
        blogs: highest[1]
    }
}

const mostLikes = (blogs) => {
    const writers = new Map()
    for (let i = 0; i < blogs.length; i++) {
        if (writers.has(blogs[i].author)) {
            writers.set(blogs[i].author, writers.get(blogs[i].author) + blogs[i].likes)
        } else {
            writers.set(blogs[i].author, blogs[i].likes)
        }
    }
    const highest = ([...writers.entries()].reduce((a, e) => e[1] > a[1] ? e : a))
    
    return {
        author: highest[0],
        likes: highest[1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

