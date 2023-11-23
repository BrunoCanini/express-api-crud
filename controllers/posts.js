const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

async function index(req, res){

    const data = await prisma.post.findMany()
    // console.log(data)
    return res.json(data)
}

async function show(req, res){
    
    const id = req.params.id;

    const data = await prisma.post.findUnique({
        where: {
            id: parseInt(id),
        },
    })

    if(!data){
        throw new Error("not found man");
    }

    return res.json(data);
}

async function store(req, res){
    
    const datiIngresso = req.body;

    const newPost = await prisma.post.create({
        data: {
            title: datiIngresso.title,
            slug: datiIngresso.slug,
            image: datiIngresso.image,
            content: datiIngresso.content,
            published: datiIngresso.published
        }
    })

    return res.json(newPost);
}

async function update(req, res){
    
    const id = req.params.id;
    const datiIngresso = req.body;

    const post = await prisma.post.findUnique({
        where:{
            id: parseInt(id),
        }
    })

    if(!post){
        throw new Error("Not Found Man")
    }

    const pizzaAggiornata = await prisma.post.update({
        data: datiIngresso,
        where: {
            id: parseInt(id),
        }
    })

    return res.json(pizzaAggiornata);

}

async function destroy(req, res){
    
    await prisma.post.delete({
        where:{
            id: parseInt(req.params.id)
        }
    });

    return res.json({message: "post eliminato correttamente"})
}

module.exports= {
    index,
    show,
    store,
    update,
    destroy
}