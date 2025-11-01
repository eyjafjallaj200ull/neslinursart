
//import { createArtworkAction } from '@/actions/createArtwork'
import { getArtworks } from "@/dal/artworks"
import Link from 'next/link'
import DeleteArtworkButton from './_components/DeleteArtworkButton'

//get all products
//on the top right of the page there should be add new artwork
//make a table element
//table head should have name year
//table rows should have each artwork with their values corresponding to the head
//and they should have actions, edit and delete

// function page() {
//   const [message, addArtworkAction, isPending] = useActionState(createArtworkAction, null)
//   return (
//     <form action={addArtworkAction}>
//       <input type="text" id="name" name="name" placeholder="name" required />
//       <input type="text" id="year" name="year" placeholder="year" required />
//       <input type="file" id="image" name="image" placeholder="image" required />
//       <button disabled={isPending} type='submit'>Submit</button>
//       {message?.errors ? message.errors : message?.success}
//     </form> 
//   )
// }

// export default page

export default async function Dashboard() {
  const artworks = await getArtworks({orderBy: true})
  if(artworks.length === 0) return <p>There are no artworks yet. <Link className='self-end text-lg font-bold mt-5 mr-10' href="dashboard/artwork/new" >Add new artwork</Link></p>
  
  return (
    <div className='w-2/3 mx-auto flex flex-col items-center'>
      <Link className='self-end text-lg font-bold mt-5 mr-10' href="dashboard/artwork/new" >Add new artwork</Link>
      <table className='border-foreground border-solid border-1 mt-5 mx-auto'>
        <thead className='border-foreground border-solid border-1'>
          <tr>
            <th className='border-foreground border-solid border-1 p-2 font-bold text-lg'>Artwork Title</th>
            <th className='border-foreground border-solid border-1 p-2 font-bold text-lg'>Artwork ID</th>
            <th className='border-foreground border-solid border-1 p-2 font-bold text-lg'>Artwork Year</th>
            <th colSpan={2} className='border-foreground border-solid border-1 p-2 font-bold text-lg'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            artworks.map((artwork) => {
              return (
                <tr className='' key={artwork.id}>
                  <th className='border-foreground border-solid border-1 p-2'>{artwork.name}</th>
                  <td className='border-foreground border-solid border-1 p-2 text-center'>{artwork.id}</td>
                  <td className='border-foreground border-solid border-1 p-2 text-center'>{artwork.year}</td>
                  {/* <td className='border-[--foreground] border-solid border-1 p-2'> */}
                    <td className='border-[--foreground] border-solid border-1 p-2 text-center hover:bg-red-700 hover:text-white'>
                      <DeleteArtworkButton id={artwork.id} />
                    </td>
                    <td className='border-foreground border-solid border-1 hover:bg-foreground hover:text-background'><Link className='p-2 text-center' href={`dashboard/artwork/${artwork.id}`}>Edit</Link></td>
                  {/* </td> */}
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}