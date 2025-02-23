"use client"
import { useState, useEffect, use } from "react";
import {useRouter} from "next/navigation"
import useAuth from "../../../utils/useAuth"

const UpdateItem = (context) => {
    const params = use(context.params);
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const loginUserEmail = useAuth()

    useEffect( () => {
        const getSingleItem = async (id) => {
            console.log(id)
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/item/readsingle/${id}`, {cache: "no-store"})
            const jsonData = await response.json()
            const singleItem = jsonData.singleItem
            //
            setTitle(singleItem.title)
            setPrice(singleItem.price)
            setImage(singleItem.image)
            setDescription(singleItem.description)
            setEmail(singleItem.email)
            setLoading(true)
        }
        getSingleItem(params.id)

    },[context])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/item/update/${params.id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: title,
                    price: price,
                    image: image,
                    description: description,
                    email: loginUserEmail
                })
            })
            const jsonData = await response.json()
            alert(jsonData.message)

            router.push("/")
            router.refresh()
        }catch {
            alert("アイテム編集失敗")
        }
    }
    if (loading) {
        if (loginUserEmail === email) {
            return (
                <div>
                    <title>アイテム編集ページ</title>
                    <meta name="description" content="アイテム編集ページです"/>
                    <h1 className="page-title">アイテム編集</h1>
                    <form  onSubmit={handleSubmit}>
                        <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                        <input value={price} onChange={(e)=> setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                        <input value={image} onChange={(e)=> setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                        <textarea value={description} onChange={(e)=> setDescription(e.target.value)} name="description" rows={15} placeholder="製品説明">
                        </textarea>
                        <button>編集</button>
                        
                    </form>
                </div>
            )
        } else {
            return <h1>権限がありません</h1>
        }
    } else {
        return <h1>ローディング中...</h1>
    }
}

export default UpdateItem