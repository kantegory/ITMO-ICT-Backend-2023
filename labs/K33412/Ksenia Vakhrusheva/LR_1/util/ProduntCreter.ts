import User from '../models/user';
import Product from '../models/userproducts'

const generateProduct = async function (name:string,num:string,des:string,cost:number,usid:number) {
    try {
        const Prouser = await User.findOne({ where: { id: usid } });
        if (!Prouser) {
            console.log("User not found");
            return null;
        }
        const product = new Product();
        product.Proname = name;
        product.ProNum= num;
        product.ProDes= des;
        product.ProCost= cost;
        product.userId = Prouser.id;
        await product.save();
        console.log("Product saved successfully");
        return product;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export default generateProduct;
