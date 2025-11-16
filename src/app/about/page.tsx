import Photo from "../../../public/about.jpeg"
import Image from "next/image"

function About() {
  return (
    <main className="mt-10 flex flex-col sm:flex-row sm:h-[400px] justify-center gap-5">
      <Image className="h-[300px] sm:h-auto sm:basis-1/4 object-contain" src={Photo} alt="Artist's photograph" />
      <article className="basis-1/3 flex flex-col justify-center p-5 sm:p-0">
        <p className="text-lg">Hi! I'm a self-taught artist and web developer. I'm a traveller at heart and I depict imaginary worlds where I explore in my mind. I mainly work with pen on paper and my creations usually have a surrealistic touch.</p>
      </article>
    </main>
  )
}

export default About