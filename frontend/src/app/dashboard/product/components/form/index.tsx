"use client"
import { ChangeEvent, useState } from 'react'
import styles from './styles.module.scss'
import { CirclePlus } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/app/dashboard/components/button'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'
import { redirect } from 'next/navigation'
import { toast } from 'sonner'

interface CategoryProps{
    id: string;
    name: string;
}

interface Props{
    categories: CategoryProps[]
}

export function Form({ categories}: Props) {
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function handleRegisterProduct(formData: FormData) {
        const category = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if(!name || !category || !price || !description || !image){
            toast.warning("É necessário preencher todos os campos!")
            return;
        }

        const data = new FormData();

        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(category)].id)
        data.append("file", image)

        const token = getCookieClient();

        await api.post("/product", data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((error) => {
            console.log(error);
             toast.warning("Falha ao cadastrar o produto!")
            return;
        })

        toast.success("Produto cadastrado!")

        redirect("/dashboard")
    }


    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Formato de imagem não aceito")
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));
        }
    }

    return (
        <main className={styles.container}>
            <h1>Novo produto</h1>

            <form className={styles.form} action={handleRegisterProduct}>

                <label className={styles.labelImage}>
                    <span>
                        <CirclePlus size={24} color="#ffff" />
                    </span>

                    <input type="file"
                        accept='image/png, image/jpeg'
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt='Imagem de preview'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}
                </label>

                <select name="category">
                 {categories.map((category, index) => (
                    <option key={category.id} value={index}>
                        {category.name}
                    </option>
                 ))}
                </select>

                <input
                    type="text"
                    name='name'
                    placeholder='Digite o nome do produto...'
                    required
                    className={styles.input}
                />

                <input
                    type="text"
                    name='price'
                    placeholder='Digite o preço do produto...'
                    required
                    className={styles.input}
                />

                <textarea
                    className={styles.input}
                    placeholder='Digite a descrição do produto...'
                    required
                    name='description'
                ></textarea>

                <Button name='Cadastar produto'/>
                
            </form>
        </main>
    )
}