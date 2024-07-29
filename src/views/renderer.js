/**
 * processo de renderização do documento index.html
 *@author Nicolas de Paula Pacheco
 */

console.log("processo de renderização")

// vinculado ao preoload.js 
console.log(`Electron: ${api.verElectron()}`)
// envio de uma mensagem
api.hello("ola!")
// recebimento de uma mensagem
api.answer((event,message)=>{
    console.log(`Processo de renderização recebeu uma mensagem: ${message}`)
})

//  função que é executada quando o botão for clicado
function sobre() {
    api.openAbout ()
}
