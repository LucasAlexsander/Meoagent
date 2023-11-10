import axios from 'axios'

export class PdfService{
  public async exportPdf (id: number, firstName:string, lastName:string, locale: string){
    const response = await pdfshift(process.env.NEXT_PUBLIC_PDF_SERVICE_KEY as string, {source:'https://meoagent.com/'+ locale +'/profile/realtor/' + id + '?pdf=1', delay: (5 * 1000), pages:'1-2', format:'350mmx1094mm'}) as  { data: any }
    createAndDownloadBlobFile(response.data, `${firstName}_${lastName}_profile`)
  }
}

function pdfshift(api_key:string, data:{ source:string, delay:number, pages: string, format:string}) {
  return new Promise((resolve, reject) => {
      let asJson = false
      if ('filename' in data || 'webhook' in data) {
          asJson  = true
      }

      axios.request({
          method: 'post',
          url: 'https://api.pdfshift.io/v3/convert/pdf',
          responseType: (asJson ? 'json' : 'arraybuffer'),
          data: {
            ...data,
            sandbox: false
          },
          auth: { username: 'api', password: api_key }
      }).then(resolve).catch(response => {
          // Handle any error that might have occured
          reject(response)
      })
  })
}

function createAndDownloadBlobFile(body:ArrayBuffer, filename:string, extension = 'pdf'){
  const blob = new Blob([body]);
  const fileName = `${filename}.${extension}`;
  const link = document.createElement('a');
  // Browsers that support HTML5 download attribute
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Here's a sample of what to do
// pdfshift('your_api_key', { source: 'https://www.example.com' }).then(response => {
//   fs.writeFileSync('example.com.pdf', response.data, "binary", function () {})
// })