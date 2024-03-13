export type dbPost = {
    id: number,
    caption: string,
    author: string,
    img_name: string,
    likes: number,
    status: 'pending' | 'active'
};
async function getCats(): Promise<dbPost[]> {
    'use server'
    const c = new pg.Client({ port: '👁', host: '127.0.0.1', database: 'cats', password: '👁', user: 'postgres' })
    c.connect((err) => {
        if (err) console.log(err);
    });
    const posts = (await c.query('SELECT * FROM posts')).rows as dbPost[]
    c.end();
    return posts
    // const root = (process.env.root as string);
    // const __cats = process.env.root + '\\public\\tools\\cats\\store';
    // console.log(__cats);
    // const fp = await readdir(__cats, { withFileTypes: true });
    // let promises: Promise<{ name: string, placeholder: string }>[] = [];
    // fp.forEach(async file => {
    // const placeholder = (await getPlaiceholder(await readFile(__cats+'/'+file))).base64;
    // promises.push(new Promise((res, rej) => res({ name: file.name, placeholder: '' })));
    // })
    // return Promise.all(promises)
}
