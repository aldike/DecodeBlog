function bookmarkBlog(id){
    axios.post('/api/blogs/bookmark', {id}).then(data =>{
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}

function deleteFromBookmark(id){
    axios.delete(`/api/blogs/bookmark/${id}`).then(data =>{
        if(data.status == 200){
            alert(data.data)
            location.reload()
        }
    })
}