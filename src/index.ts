import express, { Request, Response } from 'express'
import cors from 'cors'
import {  baseProduct, baseUser } from './database'
import { db } from './database/knex'
import { Product, Purchase, User } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong!")
})
//GET ALL USERS
app.get("/users", async (req: Request, res: Response) => {
    try {    
       const result= await db("users")
        res.status(200).send(result);
      } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
          res.status(500);
        }
            if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
    });
// GET ALL PRODUCTS
app.get("/products", async (req: Request, res: Response) => {
    try {
     const result= await db("products")
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      if (err instanceof Error) {
        res.send(err.message);
      } else {
        res.send("Error inesperado");
      }
    }
  });

// CREATE NEW USER

app.post("/users", async (req: Request, res: Response) => {
  try {
    const id= req.body.id as string;
    const name = req.body.name as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Dados invalidos");
    }

    await db.raw(`
    INSERT INTO users(id ,name, email , password)
    VALUES ("${id}","${name}", "${email}", "${password}");
    `);
   
    res.status(201).send({      message: "Cadastro realizado com sucesso"}  );
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});
// CREATE NEW PRODUCT
app.post("/products",async (req: Request, res: Response) => {
    try {
      const id = req.body.id as string;
      const name = req.body.name as string;
      const price = req.body.price as number;
      const imageUrl= req.body.imageUrl as string
      const category= req.body.category as string

      if(!id || !name || !price || !category || !imageUrl){
          res.status(404);
        throw new Error("dados invalidos");
  
      }
  
      await db.raw(`
      INSERT INTO products (id, name, price, category,image_url)
      VALUES ("${id}", "${name}", "${price}","${category} ","${imageUrl}")
      `)
      res.status(201).send({  message: "Produto cadastrado com sucesso"});
    } catch (err) {
      console.log(err);
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      if (err instanceof Error) {
        res.send(err.message);
      } else {
        res.send("Error inesperado");
      }
    }
  });

// GET PRODUCTS BY ID
app.get("/products/:id", async (req: Request, res: Response)=>{
  try{
      const id = req.params.id
      const [result] = await db.raw(`
      SELECT * FROM products
      WHERE id = '${id}';
    `)
      if(!result){
          throw new Error("Produto não existe")
      }
      res.status(200).send(result)
  }catch(error){
      console.log(error)

      if(res.statusCode === 200){
          res.status(500)
      }
      if(error instanceof Error){
          res.send(error.message)
      } else{
          res.send("Erro inesperado")
      }
  }
})

// EDIT PRODUCT BY ID
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToProduct = req.params.id as string;

    if (!idToProduct) {
      res.status(404);
      throw new Error("'id' não encontrado");
    }
    const newId = req.body.id as string;
    const newName = req.body.name as string;
    const newPrice = req.body.price as number;
    const newCategory= req.body.category as string;
    const newImageUrl= req.body.imageUrl as string;

    if (newId !== undefined){
      if(typeof newId !== "string"){
        res.status(404);
        throw new Error ("'id' deve ser string");
      }
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(404);
        throw new Error("'price' deve ser number");
      }
    }

    if (newName !== undefined) {
      if (newName.length < 2) {
        res.status(404);
        throw new Error("Name deve conter mais caracteres");
      }
      if (typeof newName !== "string") {
        res.status(404);
        throw new Error(" 'name' deve ser string");
      }
    }

    if (newCategory !== undefined){
      if(typeof newCategory  !== "string"){
        res.status(404);
        throw new Error ("'newCategory ' deve ser string");
      }
    }

    if (newImageUrl !== undefined){
      if(typeof newImageUrl  !== "string"){
        res.status(404);
        throw new Error ("'newImageUrl ' deve ser string");
      }
    }

    const [product]: Product[] | undefined[]= await db("products").where({id:idToProduct})

    if (!product) {
      res.status(404);
      throw new Error("'id' não encontrado")
    }


    const newProduct: Product={
      id: newId || product.id,
      name: newName || product.name,
      price: newPrice || product.price,
      category: newCategory || product.category,
      imageUrl: newImageUrl || product.imageUrl,
    }

    await db("products").update(newProduct).where({id:idToProduct})
    res.status(200).send({message:" Produto alterado com sucesso", user: newProduct})
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  
  }
});
// CREATE PURCHASE 
app.post("/purchases", async (req: Request, res: Response) => {
 
  try {
    const id = req.body.id as string;
    const  buyer_id = req.body.buyer_id as string;
    const total_price = req.body.total_price as number;
    const paid = req.body.paid as number;

    if (!id || !buyer_id || !total_price) {
      throw new Error("Dados invalidos.");
    }

    await db.raw(`
      INSERT INTO purchases(id, buyer_id, total_price, paid)
      VALUES("${id}","${ buyer_id}","${total_price}","${paid}");
    `)
    
    res.status(201).send({message:"Compra realizada com sucesso!"});
} catch (err) {
  console.log(err);
  if (res.statusCode === 200) {
    res.status(500);
  }

  if (err instanceof Error) {
    res.send(err.message);
  } else {
    res.send("Error inesperado");
  }
}
});

// DELETE USER BY ID
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!baseUser.some((p) => p.id === id)) {
      res.status(404);
      throw new Error("Conta nao encontrada");
    }

    const indexToId = baseUser.findIndex((user) => {
      return user.id === id;
    });

    if (indexToId >= 0) {
      baseUser.splice(indexToId, 1);
    }

    res.status(200).send(({ message: "Usuário excluído com sucesso" }));
  } catch (error) {
    res.send(error.message);
  }
});
// DELETE PRODUCT BY ID
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!baseProduct.some((p) => p.id === id)) {
      res.status(404);
      throw new Error("Conta não encontrada");
    }

    const productDelete = baseProduct.findIndex((product) => {
      return product.id === id;
    });

    if (productDelete > 0) {
      baseProduct.splice(productDelete, 1);
    }

    res.status(200).send({ message: "Produto excluído com sucesso"});
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// EDIT USER BY ID
app.put("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (!baseUser.some((user) => user.id === id)) {
      res.status(404);
      throw new Error("User não encontrado");
    }
    const newId = (req.body.id as string) || undefined;
    const newName = (req.body.name as string) || undefined;
    const newEmail = (req.body.email as string) || undefined;
    const newPassword = (req.body.password as string) || undefined;
 

    if (newPassword !== undefined) {
      if (newPassword.length < 6) {
        res.status(404);
        throw new Error("Senha deve conter no minimo 6 caracteres");
      }
    }

    if (newEmail !== undefined) {
      if (!newEmail.includes("@")) {
        res.status(404);
        throw new Error("Email deve conter @");
      }
    }

    const user = baseUser.find((user) => user.id === id);

    const newUser: User={
      id: newId || user.id,
      name: newName || user.name,
      email: newEmail || user.email,
      password: newPassword || user.password
    }
    if (user) {
      user.email = newEmail || user.email;
      user.password = newPassword || user.password;
      res.status(200).send(({ message: "Atualização realizada com sucesso", user:newUser}));
    } else {
      res.status(400).send("Usuario não encontrado");
    }
  } catch (err) {
    if (res.statusCode === 200) {
      res.status(500);
    }

    res.send(err.message);
  }
});

// DELETE PURSCHASE BY ID

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idPurchases = req.params.id as string;

    const filterPurchases = await db
      .select("*")
      .from("purchases")
      .where({ id: idPurchases })
      .first();

    if (!filterPurchases) {
      res.status(404);
      throw new Error("id não encontrado");
    }

    await db("purchases_products")
      .where("purchase_id", idPurchases)
      .del();

    await db("purchases")
      .where({ id: idPurchases })
      .del();

    res.status(200).send({ message: "Compra deletada com sucesso" });
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});


// GET ALL PURCHASES 

app.get("/purchases", async(req: Request, res: Response)=>{
  try{
      const purchases = await db.raw(`SELECT * FROM purchases`)
      res.status(200).send(purchases)
  }catch(error){
      console.log(error)

      if(res.statusCode === 200){
          res.status(500)
      }

      if(error instanceof Error){
          res.send(error.message)
      } else{
          res.send("Erro inesperado")
      }console.log(error)
  }
})


//GET PURCHASE BY ID

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idPurchases = req.params.id as string;
    console.log(idPurchases);

    const [filterPurchases] = await db
      .select("*")
      .from("purchases")
      .where({ id: idPurchases });

    console.log(filterPurchases);

    if (!filterPurchases) {
      res.status(404);
      throw new Error("id não encontrado");
    }

    const purchaseUsers = await db("purchases")
      .select(
        "purchases.id AS idDaCompra",
        "purchases.total_price AS valorDaCompra",
        "purchases.created_at AS criadaEm",
        "purchases.paid AS status",
        "users.id AS idDoComprador",
        "users.email AS emailComprador",
        "users.name AS nomeDoComprador"
      )
      .innerJoin("users", "purchases.buyer_id", "=", "users.id")
      .where({ "purchases.id": idPurchases });

    const productByPurchases = await db("purchases_products")
      .select(
        "products.id  AS idProduto",
        "products.name AS nomaProduto",
        "products.price AS preçoProduto",
        "products.category",
        "products.image_url ",
        "purchases_products.quantity"
      )
      .innerJoin(
        "products",
        "purchases_products.product_id",
        "=",
        "products.id"
      )
      .where({ "purchases_products.purchase_id": idPurchases });

    const result = {
      ...purchaseUsers[0],
      paid: purchaseUsers[0].paid === 0 ? false : true,
      productList: productByPurchases,
    };

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    if (res.statusCode === 200) {
      res.status(500);
    }

    if (err instanceof Error) {
      res.send(err.message);
    } else {
      res.send("Error inesperado");
    }
  }
});
