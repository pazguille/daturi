import { multiParser } from 'https://deno.land/x/multiparser/mod.ts'
import Layout from '@/components/Layout.jsx';

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => { resolve(reader.result); };
    reader.onerror = reject;
    reader.readAsDataURL(new Blob([file]));
  });
}

export const handler = {
  async POST(req, ctx) {
    const form = await multiParser(req);
    const files = form.files['images[]'];
    const imgs = Array.isArray(files) ? files : [files];
    const promises = await Promise.all(imgs.map(i => readFileAsync(i.content)));

    const images = imgs.map((i, index) => ({
      name: i.filename,
      size: (i.size / 1000).toFixed(2),
      base64: promises[index].replace('data:application/octet-stream', `data:${i.contentType}`),
    }));

    return ctx.render({ images });
  },
};

export default function Home(ctx) {
  const images = ctx.data ? ctx.data.images : null;

  return (
    <Layout>
      <section>
        {images ?
          <ul id="results">
            {images.map((img, id) => (
              <li class="result-box">
                <figure class="result-preview">
                  <img src={img.base64} width="250" />
                  <figcaption>
                    {img.name} - {img.size} Kb
                  </figcaption>
                </figure>
                <textarea id={`id-${id}`} class="result-code" readonly>{img.base64}</textarea>
                <button data-id={`id-${id}`} class="copy" type="button" title="Copy to clipboard">
                  <svg stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19.4 20H9.6a.6.6 0 01-.6-.6V9.6c0-.3.3-.6.6-.6h9.8c.3 0 .6.3.6.6v9.8c0 .3-.3.6-.6.6z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 9V4.6c0-.3-.3-.6-.6-.6H4.6c-.3 0-.6.3-.6.6v9.8c0 .3.3.6.6.6H9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <span>Copy</span>
                </button>
              </li>
            ))}
          </ul>
          :
          <form method="post" action="/" enctype="multipart/form-data">
            <div class="upfile">
              <label class="upfile-label" for="upfile">Select your images...</label>
              <input id="upfile" type="file" name="images[]" class="upfile-button" multiple />
            </div>
            <input type="submit" value="Convert to Base64 Code" id="submit" />
          </form>
        }
      </section>
    </Layout>
  )
}
