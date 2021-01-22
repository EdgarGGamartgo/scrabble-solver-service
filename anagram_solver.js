const fs = require("fs")
const _ = require("lodash"); 

const GetDataSource = () => {
        const text = fs.readFileSync("./words.txt", "utf-8");
        const list = text.split("\n")
        const sanitizedList = list.map((e) => e.slice(0, -1))
        return sanitizedList.filter((e) => e !== '')
}


const return_anagrams = (letters) => {
    const dictionary = GetDataSource()
    letters = letters.toLowerCase()
    var letters_count = _.countBy(letters)
    var anagrams = new Set()

     for (const word of dictionary) {
        // Check if all the unique letters in word are in the
        // scrambled letters 
        let words = new Set([...word]);
        let letterss = new Set([...letters]);
        let difference = new Set([...words].filter(x => !letterss.has(x)));
        if (difference.size === 0) {
            var check_word = new Set()
            // Check if the count of each letter is less than or equal
            // to the count of that letter in scrambled letter input
            for(const kv in _.countBy(word)) {
                if (_.countBy(word)[kv] <= letters_count[kv]) {
                    check_word.add(kv)
                }
            }
            isSetsEqual = (a, b) => a.size === b.size && [...a].every(value => b.has(value));
            // Check if check_words is exactly equal to the unique letters
            // in the word of dictionary
            if (isSetsEqual(check_word, new Set([...word]))) {
                anagrams.add(word)
            }
        }
    }
    anagrams.delete('')
    return { anagrams: [...anagrams].sort((x,y) => x.length - y.length), listLength: [...anagrams].length }
}

const start = () => {
    const startTime = (new Date()).getTime();
    const { anagrams, listLength } = return_anagrams('pamela')
    const endTime = (new Date()).getTime();
    console.log(anagrams)
    console.log(`Number of anagrams: ${listLength}`)
    console.log(`Time Taken: ${(endTime - startTime)/1000} seconds`)
}

start()
























