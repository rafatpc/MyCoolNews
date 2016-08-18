const SlugMaker = function(title){
    return (title || "").toLowerCase()
                .replace(/ /g,'-')
                .replace(/[^\w-]+/g,'');
}

export default SlugMaker;
