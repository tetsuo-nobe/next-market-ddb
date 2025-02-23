import Image from "next/image"
import Link from "next/link" 

const getSingleItem = async (id) => {
    console.log(id)
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/item/readsingle/${id}`, {cache: "no-store"})
    const jsonData = await response.json()
    const singleItem = jsonData.singleItem
    return singleItem
    //console.log(jsonData)
}

const ReadSingleItem = async (context) => {
    const singleItem = await getSingleItem((await context.params).id)
    //console.log(singleItem)
    return (
        <div className="grid-container-si">
            <title>{singleItem.title}</title>
            <meta name="description" content={singleItem.description}/>
            <div>
                <Image src={singleItem.image} width={750} height={500} alt="item-image" priority/>
            </div>
            <div>
                <h1>{singleItem.title}</h1>
                <h2>¥{singleItem.price}</h2>
                <hr/>
                <p>{singleItem.description}</p>
            </div>
            <div>
                <Link href={`/item/update/${singleItem._id}`}>アイテム編集</Link>
                <Link href={`/item/delete/${singleItem._id}`}>アイテム削除</Link>
            </div>
        </div>
        
    )
}

export default ReadSingleItem