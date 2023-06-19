import {PrismaClient} from "@prisma/client";
import fs from "fs"
import {parse} from "csv-parse"
import csvtojson from "csvtojson"
import {create} from "domain";

const prisma = new PrismaClient()

async function main() {
    // const games:any[] = []
    // csvtojson({delimiter: ","}).fromFile("/Users/kovalev-vxx/Code/GitHub/ITMO-ICT-Backend-2023/labs/K33401/Kovalev_Valery/lw_3/games-service/prisma/steam.csv").then((json) => {
    //     json.forEach((row) => {
    //         games.push(row)
    //     })
    // }).then(()=>{
    //     for (const game of games) {
    //         let {appid, name, release_date, developer, publisher, categories, genres, price} = game
    //         categories = categories.split(";")
    //         genres = genres.split(";")
    //         // prisma.game.update({where: {id: appid}, data: {genres: {deleteMany: {}, create: genres.map(genre=>({genre:{co}}))}}})
    //         prisma.game.create({
    //             data: {
    //                 id: Number(appid),
    //                 name,
    //                 price: Number(price),
    //                 categories,
    //                 // @ts-ignore
    //                 categories: {
    //                     connectOrCreate: categories.map((c:String)=>{
    //                         return {
    //                             where: {name: c},
    //                             create: {name: c}
    //                         }
    //                     })
    //                 },
    //                 // @ts-ignore
    //                 genres: {
    //                     connectOrCreate: genres.map((c:String)=>{
    //                         return {
    //                             where: {name: c},
    //                             create: {name: c}
    //                         }
    //                     })
    //                 },
    //                 developer,
    //                 publisher,
    //                 releaseDate: new Date(Date.parse(release_date))
    //             }
    //         }).then((game)=>{
    //             console.log(game.name)
    //         })
    //     }
    // })
    // console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
