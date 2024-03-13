const {Danbooru,Safebooru,Testbooru} = require('./danbooru');
(async()=>
{
    let ress;
    try{
        // ress = await Danbooru.Tags.debug().server('testbooru').order('name').category(0).name('1girl').get();
        ress = await Danbooru.Posts.Show.get(1);
    }
    catch(err){
        console.error(err)
    }

    for(let res of [ress]){
        console.log(res);
    }

})()
