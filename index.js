//Dependencies
const DirW4lker = require("dirw4lker")
const Chalk = require("chalk")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(Self_Args.length == 0){
    console.log(`node index.js <url>
Example: node index.js`)
    process.exit()
}

if(Self_Args[0].indexOf("http") == -1){
    console.log(`${Chalk.grey("[") + Chalk.redBright("ERROR") + Chalk.grey("]")} Invalid url.`)
    process.exit()
}

console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} Scanning the website for javascript files, please wait.`)
Main()
async function Main(){
    const DirW4lker_Config = {
        host: Self_Args[0],
        ext: "js",
        asyncRequests: true
    }

    const temp_results = await DirW4lker.launch(DirW4lker_Config)

    if(temp_results.founds.length == 0){
        console.log(`${Chalk.grey("[") + Chalk.yellowBright("WARNING") + Chalk.grey("]")} No javascript files found on the website.`)
        process.exit()
    }

    console.log(`${Chalk.grey("[") + Chalk.blueBright("INFO") + Chalk.grey("]")} ${temp_results.founds.length} javascript files found on the website.`)

    const results = temp_results.founds.map((l) => (l.target))

    for( i in results ){
        console.log(results[i])
    }

    process.exit()
}
