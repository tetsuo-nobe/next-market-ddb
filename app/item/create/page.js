"use client"
import  {useState} from "react"
import {useRouter} from "next/navigation"
import useAuth from "../../utils/useAuth"

const CreateItem = () => {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [description, setDescription] = useState("")
    const router = useRouter()
    const loginUserEmail = useAuth()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/item/create`, {
                method: "POST",
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
            alert("アイテム作成失敗")
        }
    }
    
    if (loginUserEmail) {
        return (
            <div>
                <title>アイテム作成ページ</title>
                <meta name="description" content="アイテム作成ページです"/>
                <h1 className="page-title">アイテム作成</h1>
                <form  onSubmit={handleSubmit}>
                    <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" name="title" placeholder="アイテム名" required/>
                    <input value={price} onChange={(e)=> setPrice(e.target.value)} type="text" name="price" placeholder="価格" required/>
                    <input value={image} onChange={(e)=> setImage(e.target.value)} type="text" name="image" placeholder="画像" required/>
                    <textarea value={description} onChange={(e)=> setDescription(e.target.value)} name="description" rows={15} placeholder="製品説明">
                    </textarea>
                    <button>作成</button>
                    
                </form>
            </div>
        )
    }

}

export default CreateItem