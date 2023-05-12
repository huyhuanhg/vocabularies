// const vowels = ["a", "o", "u", "e", "i"];
const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "q",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const noSyntax = [
  {
    v0: "abide",
    v2: "abode", //abided
    v3: "abode", //abided
  },
  {
    v0: "arise",
    v2: "arose",
    v3: "arisen",
  },
  {
    v0: "awake",
    v2: "awoke",
    v3: "awoken",
  },
  {
    v0: "backslide",
    v2: "backslid",
    v3: "backslidden|backslid",
  },
  {
    v0: "be",
    v2: "was|were",
    v3: "been",
  },
  {
    v0: "bear",
    v2: "bore",
    v3: "borne",
  },
  {
    v0: "beat",
    v2: "beat",
    v3: "beaten|beat",
  },
  {
    v0: "become",
    v2: "became",
    v3: "become",
  },
  {
    v0: "befall",
    v2: "befell",
    v3: "befallen",
  },
  {
    v0: "begin",
    v2: "began",
    v3: "begun",
  },
  {
    v0: "behold",
    v2: "beheld",
    v3: "beheld",
  },
  {
    v0: "bend",
    v2: "bent",
    v3: "bent",
  },
  {
    v0: "beset",
    v2: "beset",
    v3: "beset",
  },
  {
    v0: "bespeak",
    v2: "bespoke",
    v3: "bespoken",
  },
  {
    v0: "bet",
    v2: "bet", //betted
    v3: "bet|betted ",
  },
  {
    v0: "bid",
    v2: "bid",
    v3: "bid",
  },
  {
    v0: "bind",
    v2: "bound",
    v3: "bound",
  },
  {
    v0: "bite",
    v2: "bit",
    v3: "bitten",
  },
  {
    v0: "bleed",
    v2: "bled",
    v3: "bled",
  },
  {
    v0: "blow",
    v2: "blew",
    v3: "blown",
  },
  {
    v0: "break",
    v2: "broke",
    v3: "broken",
  },
  {
    v0: "breed",
    v2: "bred",
    v3: "bred",
  },
  {
    v0: "bring",
    v2: "brought",
    v3: "brought",
  },
  {
    v0: "broadcast",
    v2: "broadcast",
    v3: "broadcast",
  },
  {
    v0: "browbeat",
    v2: "browbeat",
    v3: "browbeaten|browbeat",
  },
  {
    v0: "build",
    v2: "built",
    v3: "built",
  },
  {
    v0: "burn",
    v2: "burnt", //burned
    v3: "burnt", //burned
  },
  {
    v0: "burst",
    v2: "burst",
    v3: "burst",
  },
  {
    v0: "bust",
    v2: "bust", //busted
    v3: "bust", //busted
  },
  {
    v0: "buy",
    v2: "bought",
    v3: "bought",
  },
  {
    v0: "cast",
    v2: "cast",
    v3: "cast",
  },
  {
    v0: "catch",
    v2: "caught",
    v3: "caught",
  },
  {
    v0: "chide",
    v2: "chid", //chided
    v3: "chid|chidden|chided",
  },
  {
    v0: "choose",
    v2: "chose",
    v3: "chosen",
  },
  {
    v0: "cleave",
    v2: "clove|cleft|cleaved",
    v3: "cloven|cleft|cleaved",
  },
  {
    v0: "cleave",
    v2: "clave",
    v3: "cleaved",
  },
  {
    v0: "cling",
    v2: "clung",
    v3: "clung",
  },
  {
    v0: "clothe",
    v2: "clad", //clothed
    v3: "clad", //clothed
  },
  {
    v0: "come",
    v2: "came",
    v3: "come",
  },
  {
    v0: "cost",
    v2: "cost",
    v3: "cost",
  },
  {
    v0: "creep",
    v2: "crept",
    v3: "crept",
  },
  {
    v0: "crossbreed",
    v2: "crossbred",
    v3: "crossbred",
  },
  {
    v0: "crow",
    v2: "crew", //crewed
    v3: "crowed",
  },
  {
    v0: "cut",
    v2: "cut",
    v3: "cut",
  },
  {
    v0: "daydream",
    v2: "daydreamt", //daydreamed
    v3: "daydreamt", //daydreamed
  },
  {
    v0: "deal",
    v2: "dealt",
    v3: "dealt",
  },
  {
    v0: "dig",
    v2: "dug",
    v3: "dug",
  },
  {
    v0: "disprove",
    v2: "disproved",
    v3: "disproven", //disproved
  },
  {
    v0: "dive",
    v2: "dove", //dived
    v3: "dived",
  },
  {
    v0: "do",
    v2: "did",
    v3: "done",
  },
  {
    v0: "draw",
    v2: "drew",
    v3: "drawn",
  },
  {
    v0: "dream",
    v2: "dreamt", //dreamed
    v3: "dreamt", //dreamed
  },
  {
    v0: "drink",
    v2: "drank",
    v3: "drunk",
  },
  {
    v0: "drive",
    v2: "drove",
    v3: "driven",
  },
  {
    v0: "dwell",
    v2: "dwelt",
    v3: "dwelt",
  },
  {
    v0: "eat",
    v2: "ate",
    v3: "eaten",
  },
  {
    v0: "fall",
    v2: "fell",
    v3: "fallen",
  },
  {
    v0: "feed",
    v2: "fed",
    v3: "fed",
  },
  {
    v0: "feel",
    v2: "felt",
    v3: "felt",
  },
  {
    v0: "fight",
    v2: "fought",
    v3: "fought",
  },
  {
    v0: "find",
    v2: "found",
    v3: "found",
  },
  {
    v0: "fit",
    v2: "fit", //fitted
    v3: "fit", //fitted
  },
  {
    v0: "flee",
    v2: "fled",
    v3: "fled",
  },
  {
    v0: "fling",
    v2: "flung",
    v3: "flung",
  },
  {
    v0: "fly",
    v2: "flew",
    v3: "flown",
  },
  {
    v0: "forbear",
    v2: "forbore",
    v3: "forborne",
  },
  {
    v0: "forbid",
    v2: "forbade|forbad",
    v3: "forbidden",
  },
  {
    v0: "forecast",
    v2: "forecast", //forecasted
    v3: "forecast", //forecasted
  },
  {
    v0: "forego",
    v2: "forewent",
    v3: "foregone",
  },
  {
    v0: "forgo",
    v2: "forewent",
    v3: "foregone",
  },
  {
    v0: "foresee",
    v2: "foresaw",
    v3: "forseen",
  },
  {
    v0: "foretell",
    v2: "foretold",
    v3: "foretold",
  },
  {
    v0: "forget",
    v2: "forgot",
    v3: "forgotten",
  },
  {
    v0: "forgive",
    v2: "forgave",
    v3: "forgiven",
  },
  {
    v0: "forsake",
    v2: "forsook",
    v3: "forsaken",
  },
  {
    v0: "freeze",
    v2: "froze",
    v3: "frozen",
  },
  {
    v0: "frostbite",
    v2: "frostbit",
    v3: "frostbitten",
  },
  {
    v0: "get",
    v2: "got",
    v3: "got|gotten",
  },
  {
    v0: "gild",
    v2: "gilt", //gilded
    v3: "gilt", //gilded
  },
  {
    v0: "gird",
    v2: "girt", //girded
    v3: "girt", //girded
  },
  {
    v0: "give",
    v2: "gave",
    v3: "given",
  },
  {
    v0: "go",
    v2: "went",
    v3: "gone",
  },
  {
    v0: "grind",
    v2: "ground",
    v3: "ground",
  },
  {
    v0: "grow",
    v2: "grew",
    v3: "grown",
  },
  {
    v0: "hand-feed",
    v2: "hand-fed",
    v3: "hand-fed",
  },
  {
    v0: "handwrite",
    v2: "handwrote",
    v3: "handwritten",
  },
  {
    v0: "hang",
    v2: "hung",
    v3: "hung",
  },
  {
    v0: "have",
    v2: "had",
    v3: "had",
  },
  {
    v0: "hear",
    v2: "heard",
    v3: "heard",
  },
  {
    v0: "heave",
    v2: "hove", //heaved
    v3: "hove", //heaved
  },
  {
    v0: "hew",
    v2: "hewed",
    v3: "hewn", //hewed
  },
  {
    v0: "hide",
    v2: "hid",
    v3: "hidden",
  },
  {
    v0: "hit",
    v2: "hit",
    v3: "hit",
  },
  {
    v0: "hurt",
    v2: "hurt",
    v3: "hurt",
  },
  {
    v0: "inbreed",
    v2: "inbred",
    v3: "inbred",
  },
  {
    v0: "inlay",
    v2: "inlaid",
    v3: "inlaid",
  },
  {
    v0: "input",
    v2: "input",
    v3: "input",
  },
  {
    v0: "inset",
    v2: "inset",
    v3: "inset",
  },
  {
    v0: "interbreed",
    v2: "interbred",
    v3: "interbred",
  },
  {
    v0: "interweave",
    v2: "interwove", //interweaved
    v3: "interwoven", //interweaved
  },
  {
    v0: "interwind",
    v2: "interwound",
    v3: "interwound",
  },
  {
    v0: "jerry-build",
    v2: "jerry-built",
    v3: "jerry-built",
  },
  {
    v0: "keep",
    v2: "kept",
    v3: "kept",
  },
  {
    v0: "kneel",
    v2: "knelt", //kneeled
    v3: "knelt", //kneeled
  },
  {
    v0: "knit",
    v2: "knit", //knitted
    v3: "knit", //knitted
  },
  {
    v0: "know",
    v2: "knew",
    v3: "known",
  },
  {
    v0: "lay",
    v2: "laid",
    v3: "laid",
  },
  {
    v0: "lead",
    v2: "led",
    v3: "led",
  },
  {
    v0: "lean",
    v2: "leant", //leaned
    v3: "leant", //leaned
  },
  {
    v0: "leap",
    v2: "leapt",
    v3: "leapt",
  },
  {
    v0: "learn",
    v2: "learnt", //learned
    v3: "learnt", //learned
  },
  {
    v0: "leave",
    v2: "left",
    v3: "left",
  },
  {
    v0: "lend",
    v2: "lent",
    v3: "lent",
  },
  {
    v0: "let",
    v2: "let",
    v3: "let",
  },
  {
    v0: "lie",
    v2: "lay",
    v3: "lain",
  },
  {
    v0: "light",
    v2: "lit", //lighted
    v3: "lit", //lighted
  },
  {
    v0: "lip-read",
    v2: "lip-read",
    v3: "lip-read",
  },
  {
    v0: "lose",
    v2: "lost",
    v3: "lost",
  },
  {
    v0: "make",
    v2: "made",
    v3: "made",
  },
  {
    v0: "mean",
    v2: "meant",
    v3: "meant",
  },
  {
    v0: "meet",
    v2: "met",
    v3: "met",
  },
  {
    v0: "miscast",
    v2: "miscast",
    v3: "miscast",
  },
  {
    v0: "misdeal",
    v2: "misdealt",
    v3: "misdealt",
  },
  {
    v0: "misdo",
    v2: "misdid",
    v3: "misdone",
  },
  {
    v0: "mishear",
    v2: "misheard",
    v3: "misheard",
  },
  {
    v0: "mislay",
    v2: "mislaid",
    v3: "mislaid",
  },
  {
    v0: "mislead",
    v2: "misled",
    v3: "misled",
  },
  {
    v0: "mislearn",
    v2: "mislearnt", //mislearned
    v3: "mislearnt", //mislearned
  },
  {
    v0: "misread",
    v2: "misread",
    v3: "misread",
  },
  {
    v0: "misset",
    v2: "misset",
    v3: "misset",
  },
  {
    v0: "misspeak",
    v2: "misspoke",
    v3: "misspoken",
  },
  {
    v0: "misspell",
    v2: "misspelt",
    v3: "misspelt",
  },
  {
    v0: "misspend",
    v2: "misspent",
    v3: "misspent",
  },
  {
    v0: "mistake",
    v2: "mistook",
    v3: "mistaken",
  },
  {
    v0: "misteach",
    v2: "mistaught",
    v3: "mistaught",
  },
  {
    v0: "misunderstand",
    v2: "misunderstood",
    v3: "misunderstood",
  },
  {
    v0: "miswrite",
    v2: "miswrote",
    v3: "miswritten",
  },
  {
    v0: "mow",
    v2: "mowed",
    v3: "mown", //mowed
  },
  {
    v0: "offset",
    v2: "offset",
    v3: "offset",
  },
  {
    v0: "outbid",
    v2: "outbid",
    v3: "outbid",
  },
  {
    v0: "outbreed",
    v2: "outbred",
    v3: "outbred",
  },
  {
    v0: "outdo",
    v2: "outdid",
    v3: "outdone",
  },
  {
    v0: "outdraw",
    v2: "outdrew",
    v3: "outdrawn",
  },
  {
    v0: "outdrink",
    v2: "outdrank",
    v3: "outdrunk",
  },
  {
    v0: "outdrive",
    v2: "outdrove",
    v3: "outdriven",
  },
  {
    v0: "outfight",
    v2: "outfought",
    v3: "outfought",
  },
  {
    v0: "outfly",
    v2: "outflew",
    v3: "outflown",
  },
  {
    v0: "outgrow",
    v2: "outgrew",
    v3: "outgrown",
  },
  {
    v0: "outleap",
    v2: "outleapt", //outleaped
    v3: "outleapt", //outleaped
  },
  {
    v0: "outlie",
    v2: "outlied",
    v3: "outlied",
  },
  {
    v0: "output",
    v2: "output",
    v3: "output",
  },
  {
    v0: "outride",
    v2: "outrode",
    v3: "outridden",
  },
  {
    v0: "outrun",
    v2: "outran",
    v3: "outrun",
  },
  {
    v0: "outsell",
    v2: "outsold",
    v3: "outsold",
  },
  {
    v0: "outshine",
    v2: "outshone", //outshined
    v3: "outshone", //outshined
  },
  {
    v0: "outshoot",
    v2: "outshot",
    v3: "outshot",
  },
  {
    v0: "outsing",
    v2: "outsang",
    v3: "outsung",
  },
  {
    v0: "outsit",
    v2: "outsat",
    v3: "outsat",
  },
  {
    v0: "outsleep",
    v2: "outslept",
    v3: "outslept",
  },
  {
    v0: "outsmell",
    v2: "outsmelt", //outsmelled
    v3: "outsmelt", //outsmelled
  },
  {
    v0: "outspeak",
    v2: "outspoke",
    v3: "outspoken",
  },
  {
    v0: "outspeed",
    v2: "outsped",
    v3: "outsped",
  },
  {
    v0: "outspend",
    v2: "outspent",
    v3: "outspent",
  },
  {
    v0: "outswear",
    v2: "outswore",
    v3: "outsworn",
  },
  {
    v0: "outswim",
    v2: "outswam",
    v3: "outswum",
  },
  {
    v0: "outthink",
    v2: "outthought",
    v3: "outthought",
  },
  {
    v0: "outthrow",
    v2: "outthrew",
    v3: "outthrown",
  },
  {
    v0: "outwrite",
    v2: "outwrote",
    v3: "outwritten",
  },
  {
    v0: "overbid",
    v2: "overbid",
    v3: "overbid",
  },
  {
    v0: "overbreed",
    v2: "overbred",
    v3: "overbred",
  },
  {
    v0: "overbuild",
    v2: "overbuilt",
    v3: "overbuilt",
  },
  {
    v0: "overbuy",
    v2: "overbought",
    v3: "overbought",
  },
  {
    v0: "overcome",
    v2: "overcame",
    v3: "overcome",
  },
  {
    v0: "overdo",
    v2: "overdid",
    v3: "overdone",
  },
  {
    v0: "overdraw",
    v2: "overdrew",
    v3: "overdrawn",
  },
  {
    v0: "overdrink",
    v2: "overdrank",
    v3: "overdrunk",
  },
  {
    v0: "overeat",
    v2: "overate",
    v3: "overeaten",
  },
  {
    v0: "overfeed",
    v2: "overfed",
    v3: "overfed",
  },
  {
    v0: "overfly",
    v2: "overflew",
    v3: "overflown",
  },
  {
    v0: "overhang",
    v2: "overhung",
    v3: "overhung",
  },
  {
    v0: "overhear",
    v2: "overheard",
    v3: "overheard",
  },
  {
    v0: "overlay",
    v2: "overlaid",
    v3: "overlaid",
  },
  {
    v0: "overpay",
    v2: "overpaid",
    v3: "overpaid",
  },
  {
    v0: "override",
    v2: "overrode",
    v3: "overridden",
  },
  {
    v0: "overrun",
    v2: "overran",
    v3: "overrun",
  },
  {
    v0: "oversee",
    v2: "oversaw",
    v3: "overseen",
  },
  {
    v0: "oversell",
    v2: "oversold",
    v3: "oversold",
  },
  {
    v0: "oversew",
    v2: "oversewed",
    v3: "oversewn", //oversewed
  },
  {
    v0: "overshoot",
    v2: "overshot",
    v3: "overshot",
  },
  {
    v0: "oversleep",
    v2: "overslept",
    v3: "overslept",
  },
  {
    v0: "overspeak",
    v2: "overspoke",
    v3: "overspoken",
  },
  {
    v0: "overspend",
    v2: "overspent",
    v3: "overspent",
  },
  {
    v0: "overspill",
    v2: "overspilt", //overspilled
    v3: "overspilt", //overspilled
  },
  {
    v0: "overtake",
    v2: "overtook",
    v3: "overtaken",
  },
  {
    v0: "overthink",
    v2: "overthought",
    v3: "overthought",
  },
  {
    v0: "overthrow",
    v2: "overthrew",
    v3: "overthrown",
  },
  {
    v0: "overwind",
    v2: "overwound",
    v3: "overwound",
  },
  {
    v0: "overwrite",
    v2: "overwrote",
    v3: "overwritten",
  },
  {
    v0: "partake",
    v2: "partook",
    v3: "partaken",
  },
  {
    v0: "pay",
    v2: "paid",
    v3: "paid",
  },
  {
    v0: "plead",
    v2: "pleaded", //pled
    v3: "pleaded", //pled
  },
  {
    v0: "prebuild",
    v2: "prebuilt",
    v3: "prebuilt",
  },
  {
    v0: "predo",
    v2: "predid",
    v3: "predone",
  },
  {
    v0: "premake",
    v2: "premade",
    v3: "premade",
  },
  {
    v0: "prepay",
    v2: "prepaid",
    v3: "prepaid",
  },
  {
    v0: "presell",
    v2: "presold",
    v3: "presold",
  },
  {
    v0: "preset",
    v2: "preset",
    v3: "preset",
  },
  {
    v0: "preshrink",
    v2: "preshrank",
    v3: "preshrunk",
  },
  {
    v0: "proofread",
    v2: "proofread",
    v3: "proofread",
  },
  {
    v0: "prove",
    v2: "proved",
    v3: "proven", //proved
  },
  {
    v0: "put",
    v2: "put",
    v3: "put",
  },
  {
    v0: "quick-freeze",
    v2: "quick-froze",
    v3: "quick-frozen",
  },
  {
    v0: "quit",
    v2: "quit", //quitted
    v3: "quit", //quitted
  },
  {
    v0: "read",
    v2: "read",
    v3: "read",
  },
  {
    v0: "reawake",
    v2: "reawoke",
    v3: "reawaken",
  },
  {
    v0: "rebid",
    v2: "rebid",
    v3: "rebid",
  },
  {
    v0: "rebind",
    v2: "rebound",
    v3: "rebound",
  },
  {
    v0: "rebroadcast",
    v2: "rebroadcast", //rebroadcasted
    v3: "rebroadcast", //rebroadcasted
  },
  {
    v0: "rebuild",
    v2: "rebuilt",
    v3: "rebuilt",
  },
  {
    v0: "recast",
    v2: "recast",
    v3: "recast",
  },
  {
    v0: "recut",
    v2: "recut",
    v3: "recut",
  },
  {
    v0: "redeal",
    v2: "redealt",
    v3: "redealt",
  },
  {
    v0: "redo",
    v2: "redid",
    v3: "redone",
  },
  {
    v0: "redraw",
    v2: "redrew",
    v3: "redrawn",
  },
  {
    v0: "refit",
    v2: "refit", //refitted
    v3: "refit", //refitted
  },
  {
    v0: "regrind",
    v2: "reground",
    v3: "reground",
  },
  {
    v0: "regrow",
    v2: "regrew",
    v3: "regrown",
  },
  {
    v0: "rehang",
    v2: "rehung",
    v3: "rehung",
  },
  {
    v0: "rehear",
    v2: "reheard",
    v3: "reheard",
  },
  {
    v0: "reknit",
    v2: "reknit", //reknitted
    v3: "reknit", //reknitted
  },
  {
    v0: "relay",
    v2: "relaid",
    v3: "relaid",
  },
  {
    v0: "relay",
    v2: "relayed",
    v3: "relayed",
  },
  {
    v0: "relearn",
    v2: "relearnt", //relearned
    v3: "relearnt", //relearned
  },
  {
    v0: "relight",
    v2: "relit", //relighted
    v3: "relit", //relighted
  },
  {
    v0: "remake",
    v2: "remade",
    v3: "remade",
  },
  {
    v0: "rend",
    v2: "rent",
    v3: "rent",
  },
  {
    v0: "repay",
    v2: "repaid",
    v3: "repaid",
  },
  {
    v0: "reread",
    v2: "reread",
    v3: "reread",
  },
  {
    v0: "rerun",
    v2: "reran",
    v3: "rerun",
  },
  {
    v0: "resell",
    v2: "resold",
    v3: "resold",
  },
  {
    v0: "resend",
    v2: "resent",
    v3: "resent",
  },
  {
    v0: "reset",
    v2: "reset",
    v3: "reset",
  },
  {
    v0: "resew",
    v2: "resewed",
    v3: "resewn", //resewed
  },
  {
    v0: "retake",
    v2: "retook",
    v3: "retaken",
  },
  {
    v0: "reteach",
    v2: "retaught",
    v3: "retaught",
  },
  {
    v0: "retear",
    v2: "retore",
    v3: "retorn",
  },
  {
    v0: "retell",
    v2: "retold",
    v3: "retold",
  },
  {
    v0: "rethink",
    v2: "rethought",
    v3: "rethought",
  },
  {
    v0: "retread",
    v2: "retread",
    v3: "retread",
  },
  {
    v0: "retrofit",
    v2: "retrofit", //retrofitted
    v3: "retrofit", //retrofitted
  },
  {
    v0: "rewake",
    v2: "rewoke", //rewaked
    v3: "rewaken", //rewaked
  },
  {
    v0: "rewear",
    v2: "rewore",
    v3: "reworn",
  },
  {
    v0: "reweave",
    v2: "rewove", //reweaved
    v3: "rewoven", //reweaved
  },
  {
    v0: "rewed",
    v2: "rewed", //rewedded
    v3: "rewed", //rewedded
  },
  {
    v0: "rewet",
    v2: "rewet", //rewetted
    v3: "rewet", //rewetted
  },
  {
    v0: "rewin",
    v2: "rewon",
    v3: "rewon",
  },
  {
    v0: "rewind",
    v2: "rewound",
    v3: "rewound",
  },
  {
    v0: "rewrite",
    v2: "rewrote",
    v3: "rewritten",
  },
  {
    v0: "rid",
    v2: "rid",
    v3: "rid",
  },
  {
    v0: "ride",
    v2: "rode",
    v3: "ridden",
  },
  {
    v0: "ring",
    v2: "rang",
    v3: "rung",
  },
  {
    v0: "rise",
    v2: "rose",
    v3: "risen",
  },
  {
    v0: "roughcast",
    v2: "roughcast",
    v3: "roughcast",
  },
  {
    v0: "run",
    v2: "ran",
    v3: "run",
  },
  {
    v0: "sand-cast",
    v2: "sand-cast",
    v3: "sand-cast",
  },
  {
    v0: "saw",
    v2: "sawed",
    v3: "sawn",
  },
  {
    v0: "say",
    v2: "said",
    v3: "said",
  },
  {
    v0: "see",
    v2: "saw",
    v3: "seen",
  },
  {
    v0: "seek",
    v2: "sought",
    v3: "sought",
  },
  {
    v0: "sell",
    v2: "sold",
    v3: "sold",
  },
  {
    v0: "send",
    v2: "sent",
    v3: "sent",
  },
  {
    v0: "set",
    v2: "set",
    v3: "set",
  },
  {
    v0: "sew",
    v2: "sewed",
    v3: "sewn", //sewed
  },
  {
    v0: "shake",
    v2: "shook",
    v3: "shaken",
  },
  {
    v0: "shave",
    v2: "shaved",
    v3: "shaven", //shaved
  },
  {
    v0: "shear",
    v2: "sheared",
    v3: "shorn",
  },
  {
    v0: "shed",
    v2: "shed",
    v3: "shed",
  },
  {
    v0: "shine",
    v2: "shone",
    v3: "shone",
  },
  {
    v0: "shit",
    v2: "shit|shat|shitted",
    v3: "shit|shat|shitted",
  },
  {
    v0: "shoot",
    v2: "shot",
    v3: "shot",
  },
  {
    v0: "show",
    v2: "showed",
    v3: "shown", //showed
  },
  {
    v0: "shrink",
    v2: "shrank",
    v3: "shrunk",
  },
  {
    v0: "shut",
    v2: "shut",
    v3: "shut",
  },
  {
    v0: "sight-read",
    v2: "sight-read",
    v3: "sight-read",
  },
  {
    v0: "sing",
    v2: "sang",
    v3: "sung",
  },
  {
    v0: "sink",
    v2: "sank",
    v3: "sunk",
  },
  {
    v0: "sit",
    v2: "sat",
    v3: "sat",
  },
  {
    v0: "slay",
    v2: "slew",
    v3: "slain",
  },
  {
    v0: "sleep",
    v2: "slept",
    v3: "slept",
  },
  {
    v0: "slide",
    v2: "slid",
    v3: "slid",
  },
  {
    v0: "sling",
    v2: "slung",
    v3: "slung",
  },
  {
    v0: "slink",
    v2: "slunk",
    v3: "slunk",
  },
  {
    v0: "slit",
    v2: "slit",
    v3: "slit",
  },
  {
    v0: "smell",
    v2: "smelt",
    v3: "smelt",
  },
  {
    v0: "smite",
    v2: "smote",
    v3: "smitten",
  },
  {
    v0: "sneak",
    v2: "snuck", //sneaked
    v3: "snuck", //sneaked
  },
  {
    v0: "speak",
    v2: "spoke",
    v3: "spoken",
  },
  {
    v0: "speed",
    v2: "sped", //speeded
    v3: "sped", //speeded
  },
  {
    v0: "spell",
    v2: "spelt", //spelled
    v3: "spelt", //spelled
  },
  {
    v0: "spend",
    v2: "spent",
    v3: "spent",
  },
  {
    v0: "spill",
    v2: "spilt", //spilled
    v3: "spilt", //spilled
  },
  {
    v0: "spin",
    v2: "spun|span",
    v3: "spun",
  },
  {
    v0: "spoil",
    v2: "spoilt", //spoiled
    v3: "spoilt", //spoiled
  },
  {
    v0: "spread",
    v2: "spread",
    v3: "spread",
  },
  {
    v0: "stand",
    v2: "stood",
    v3: "stood",
  },
  {
    v0: "steal",
    v2: "stole",
    v3: "stolen",
  },
  {
    v0: "stick",
    v2: "stuck",
    v3: "stuck",
  },
  {
    v0: "sting",
    v2: "stung",
    v3: "stung",
  },
  {
    v0: "stink",
    v2: "stunk|stank",
    v3: "stunk",
  },
  {
    v0: "stride",
    v2: "strode",
    v3: "stridden",
  },
  {
    v0: "strike",
    v2: "struck",
    v3: "struck",
  },
  {
    v0: "string",
    v2: "strung",
    v3: "strung",
  },
  {
    v0: "sunburn",
    v2: "sunburnt", //sunburned
    v3: "sunburnt", //sunburned
  },
  {
    v0: "swear",
    v2: "swore",
    v3: "sworn",
  },
  {
    v0: "sweat",
    v2: "sweat", //sweated
    v3: "sweat", //sweated
  },
  {
    v0: "sweep",
    v2: "swept",
    v3: "swept",
  },
  {
    v0: "swell",
    v2: "swelled",
    v3: "swollen", //swelled
  },
  {
    v0: "swim",
    v2: "swam",
    v3: "swum",
  },
  {
    v0: "swing",
    v2: "swung",
    v3: "swung",
  },
  {
    v0: "take",
    v2: "took",
    v3: "taken",
  },
  {
    v0: "teach",
    v2: "taught",
    v3: "taught",
  },
  {
    v0: "tear",
    v2: "tore",
    v3: "torn",
  },
  {
    v0: "telecast",
    v2: "telecast",
    v3: "telecast",
  },
  {
    v0: "tell",
    v2: "told",
    v3: "told",
  },
  {
    v0: "think",
    v2: "thought",
    v3: "thought",
  },
  {
    v0: "throw",
    v2: "threw",
    v3: "thrown",
  },
  {
    v0: "thrust",
    v2: "thrust",
    v3: "thrust",
  },
  {
    v0: "tread",
    v2: "trod",
    v3: "trodden|trod",
  },
  {
    v0: "typewrite",
    v2: "typewrote",
    v3: "typewritten",
  },
  {
    v0: "unbend",
    v2: "unbent",
    v3: "unbent",
  },
  {
    v0: "unbind",
    v2: "unbound",
    v3: "unbound",
  },
  {
    v0: "unclothe",
    v2: "unclad", //unclothed
    v3: "unclad", //unclothed
  },
  {
    v0: "undercut",
    v2: "undercut",
    v3: "undercut",
  },
  {
    v0: "underfeed",
    v2: "underfed",
    v3: "underfed",
  },
  {
    v0: "undergo",
    v2: "underwent",
    v3: "undergone",
  },
  {
    v0: "underlie",
    v2: "underlay",
    v3: "underlain",
  },
  {
    v0: "understand",
    v2: "understood",
    v3: "understood",
  },
  {
    v0: "undertake",
    v2: "undertook",
    v3: "undertaken",
  },
  {
    v0: "underwrite",
    v2: "underwrote",
    v3: "underwritten",
  },
  {
    v0: "undo",
    v2: "undid",
    v3: "undone",
  },
  {
    v0: "unfreeze",
    v2: "unfroze",
    v3: "unfrozen",
  },
  {
    v0: "unhang",
    v2: "unhung",
    v3: "unhung",
  },
  {
    v0: "unhide",
    v2: "unhid",
    v3: "unhidden",
  },
  {
    v0: "unlearn",
    v2: "unlearnt", //unlearned
    v3: "unlearnt", //unlearned
  },
  {
    v0: "unspin",
    v2: "unspun",
    v3: "unspun",
  },
  {
    v0: "unwind",
    v2: "unwound",
    v3: "unwound",
  },
  {
    v0: "uphold",
    v2: "upheld",
    v3: "upheld",
  },
  {
    v0: "upset",
    v2: "upset",
    v3: "upset",
  },
  {
    v0: "wake",
    v2: "woke", //waked
    v3: "woken", //waked
  },
  {
    v0: "wear",
    v2: "wore",
    v3: "worn",
  },
  {
    v0: "wed",
    v2: "wed", //wedded
    v3: "wed", //wedded
  },
  {
    v0: "weep",
    v2: "wept",
    v3: "wept",
  },
  {
    v0: "wet",
    v2: "wet", //wetted
    v3: "wet", //wetted
  },
  {
    v0: "win",
    v2: "won",
    v3: "won",
  },
  {
    v0: "wind",
    v2: "wound",
    v3: "wound",
  },
  {
    v0: "withdraw",
    v2: "withdrew",
    v3: "withdrawn",
  },
  {
    v0: "withhold",
    v2: "withheld",
    v3: "withheld",
  },
  {
    v0: "withstand",
    v2: "withstood",
    v3: "withstood",
  },
  {
    v0: "work",
    v2: "worked",
    v3: "worked",
  },
  {
    v0: "wring",
    v2: "wrung",
    v3: "wrung",
  },
  {
    v0: "write",
    v2: "wrote",
    v3: "written",
  },
];

const getPresentOrPluralNounPattern = (
  keyword: string,
  sentence: string
): string => {
  /**
   * https://vn.elsaspeak.com/cach-them-s-es-vao-danh-tu/
   *
   * 1. Thêm s vào sau các danh từ số ít đếm được để thành lập dạng số nhiều của từ.
   * 2. Đối với các danh từ có tận cùng bằng chữ cái s, ss, sh, ch, z và x sẽ được thêm es vào cuối.
   * 3. Thêm es đằng sau các danh từ tận cùng bằng phụ âm + o
   * 4. Các danh từ tận cùng có phụ âm + y thì y sẽ được đổi thành i và thêm es vào cuối.
   * 5. Các danh từ tận cùng gồm nguyên âm a, o, u, e, i + y thì vẫn giữ nguyên và thêm s.
   * 6. Đối với các danh từ có tận cùng bằng f hoặc fe, cách thêm s es vào danh từ sẽ được chia thành 2 trường hợp.
   *    6,1. Các danh từ thuộc nhóm sau sẽ được lược bỏ f hoặc fe bằng “v” và thêm es vào sau:
   *    6,2. Các trường hợp còn lại có tận cùng bằng f hoặc fe sẽ được giữ nguyên và thêm s như thông thường để thành lập số nhiều.
   * 7. Một số các trường hợp đặc biệt khi chuyển thành danh từ số nhiều
   *    7,1. Một số danh từ có nguyên âm ở giữa không áp dụng cách thêm s es như thông thường do những từ này có dạng số nhiều riêng.
   *    7,2. Một số danh từ chỉ ở dạng số nhiều và luôn được chia với động từ số nhiều.
   *    7,3. Chú ý những danh từ có hình thức số nhiều với s hoặc es ở đuôi nhưng lại mang nghĩa số ít.
   *    7,4. Những danh từ có nguồn gốc nước ngoài, Latinh sử dụng hình thức số nhiều riêng,
   *      không áp dụng cách thêm s es vào danh từ như thông thường.
   *    7,5. Ngoài ra, vẫn có những danh từ mà hình thức số nhiều và số ít như nhau.
   */

  // Dựa theo danh sách trên:
  // 7,5. Trường hợp này có thể đã được xử lý ở case Normal (Deer, swine, fish, salmon…)

  /**
   * 7,4.
   * radius => radii
   * basis => bases
   * oasis => oases
   * datum => data
   */

  switch (keyword.toLowerCase()) {
    case "radius":
      keyword = "radii";
      break;
    case "basis":
      keyword = "bases";
      break;
    case "oasis":
      keyword = "oases";
      break;
    case "datum":
      keyword = "data";
      break;
  }

  const pattern7_4 = baseGetPattern(keyword, sentence);

  if (pattern7_4) {
    return pattern7_4;
  }
  // 7,3. Trường hợp này có thể đã được xử lý ở case Normal (News, mumps, darts, bowls, dominoes, shingles…)
  // 7,2. Trường hợp này có thể đã được xử lý ở case Normal (Clothes, police, cattle, arms, goods, stairs, riches…)

  /**
   * 7,1.
   * foot  => feet
   * tooth  => teeth
   * goose  => geese
   * man  => men
   * woman  => women
   * mouse  => mice
   * child  => children
   */

  switch (keyword.toLowerCase()) {
    case "foot":
      keyword = "feet";
      break;
    case "tooth":
      keyword = "teeth";
      break;
    case "goose":
      keyword = "geese";
      break;
    case "man":
      keyword = "men";
      break;
    case "woman":
      keyword = "women";
      break;
    case "mouse":
      keyword = "mice";
      break;
    case "child":
      keyword = "children";
      break;
  }

  const pattern7_3 = baseGetPattern(keyword, sentence);

  if (pattern7_3) {
    return pattern7_3;
  }

  /**
   * 6,1
   * calf => calves
   * half => halves
   * knife => knives
   * leaf => leaves
   * life => lives
   * loaf => loaves
   * self => selves
   * shelf => shelves
   * thief => thieves
   * wife => wives
   * wolf => wolves
   */

  const removeFrOrFpattern = baseGetPattern(
    keyword.replace(/(f|fe)$/i, "ves"),
    sentence
  );
  // if (/^(calf|half|knife|leaf|life|loaf|self|shelf|thief|wife|wolf)$/i.test(keyword)) {
  //   return baseGetPattern(keyword.replace(/(f|fe)$/i, "ves"), sentence)
  // }
  if (removeFrOrFpattern) {
    return removeFrOrFpattern;
  }

  // 5: nguyên âm + y. (a, o, u, e, i) + y

  // if ((new RegExp(`(${vowels.join('|')})y$`, 'i')).test(keyword)) {
  //   return baseGetPattern(`${keyword}s`, sentence)
  // }

  // 4

  if (/y$/i.test(keyword)) {
    return baseGetPattern(keyword.replace(/y$/i, "ies"), sentence);
  }

  // 2 & 3: Tận cùng s, ss, sh, ch, z, x & phụ âm + o
  if (
    new RegExp(`((${consonants.join("|")})o)|s|sh|ch|z|x$`, "i").test(keyword)
  ) {
    return baseGetPattern(`${keyword}es`, sentence);
  }

  // 5 (Tận cùng nguyên âm + y. (a, o, u, e, i) + y) & 1
  return baseGetPattern(`${keyword}s`, sentence);
};

const getContinueOrGerundPattern = (
  keyword: string,
  sentence: string
): string => {
  /**
   * https://zim.vn/quy-tac-them-ing
   * Quy tắc liên quan đến từ chữ cái cuối cùng
   * 1. Khi chữ cái cuối cùng là 1 chữ “e” (bỏ chữ "e" và thêm vào đuôi “ing”)
   * 2. Khi chữ cái cuối cùng là  2 chữ “e” -”ee” (+ "ing")
   * 3. Khi chữ cái cuối cùng là “c” (+ "king")
   * 4. Khi chữ cái cuối cùng là “ie” (chuyển đổi “ie” thành “y” sau đó thêm “ing” phía sau. )
   *
   * Quy tắc liên quan đến nguyên âm và phụ âm chữ cái cuối cùng
   * 1. Khi động từ chỉ có một âm tiết và những chữ cái cuối cùng là nguyên âm + phụ âm
   *    (nguyên âm + phụ âm ngoại trừ phụ âm cuối là: h, w, x, y; gấp đôi phụ âm + "ing")
   * 2. Khi động từ chỉ có một âm tiết và những chữ cái cuối cùng là 2 nguyên âm + phụ âm hoặc “phụ âm + phụ âm” ở cuối (+ "ing").
   * 3. Khi động từ chỉ có hai âm tiết, trọng âm rơi vào âm tiết cuối và những chữ cái cuối cùng là nguyên âm + phụ âm
   *    (gấp đôi phụ âm và thêm “ing”)
   */

  // 2
  if (/ee$/i.test(keyword)) {
    return baseGetPattern(`${keyword}ing`, sentence);
  }

  // 4
  if (/ie$/i.test(keyword)) {
    return baseGetPattern(keyword.replace(/ie$/i, "ying"), sentence);
  }

  // 1
  if (/e$/i.test(keyword)) {
    return baseGetPattern(keyword.replace(/e$/i, "ing"), sentence);
  }

  // 3
  if (/c$/i.test(keyword)) {
    return baseGetPattern(`${keyword}king`, sentence);
  }

  const x2lastCharParttern = baseGetPattern(
    keyword.replace(/([a-z])$/i, "$1$1ing"),
    sentence
  );

  if (x2lastCharParttern) {
    return x2lastCharParttern;
  }

  return baseGetPattern(`${keyword}ing`, sentence);
};

const getSimplePastPattern = (keyword: string, sentence: string): string => {
  /**
   * https://vn.elsaspeak.com/thi-qua-khu-don-trong-tieng-anh/#Quy_tac_them_ed_va_cach_phat_am_duoi_ed_chuan_chinh
   */

  let pattern = baseGetPattern(`${keyword}d`, sentence);

  if (pattern) {
    return pattern;
  }

  const x2lastCharParttern = baseGetPattern(
    keyword.replace(/([a-z])$/i, "$1$1ed"),
    sentence
  );

  if (x2lastCharParttern) {
    return x2lastCharParttern;
  }

  const replaceYPattern = baseGetPattern(
    keyword.replace(/y$/i, "ied"),
    sentence
  );
  if (replaceYPattern) {
    return replaceYPattern;
  }

  return baseGetPattern(`${keyword}ed`, sentence);
};

const baseGetPattern = (keyword: string, sentence: string): string => {
  const normalRegex = new RegExp(`(^|\\W)(${keyword})(\\W|$)`, "i");
  const matches = sentence.match(normalRegex);

  return matches ? matches[2] : "";
};

export const getPattern = (keyword: string, sentence?: string) => {
  if (!sentence) {
    throw new Error("Pattern: Not found sentence!");
  }

  // nornal
  const nornalPattern = baseGetPattern(keyword, sentence);

  if (nornalPattern) {
    return nornalPattern;
  }

  // Vs / Ves | Ns / Nes
  let pattern = getPresentOrPluralNounPattern(keyword, sentence);

  if (pattern) {
    return pattern;
  }

  // Ving
  pattern = getContinueOrGerundPattern(keyword, sentence);

  if (pattern) {
    return pattern;
  }

  // Ved
  pattern = getSimplePastPattern(keyword, sentence);

  if (pattern) {
    return pattern;
  }

  // no syntax
  const verbIndex = noSyntax.findIndex((verb) => {
    const regex = new RegExp(`(^|\\|)${keyword}($|\\|)`);
    return regex.test(verb.v0) || regex.test(verb.v2) || regex.test(verb.v3);
  });

  if (verbIndex !== -1) {
    pattern = baseGetPattern(
      `${noSyntax[verbIndex].v0}|${noSyntax[verbIndex].v2}|${noSyntax[verbIndex].v3}`,
      sentence
    );

    if (pattern) {
      return pattern;
    }
  }

  throw new Error("Pattern: Not found pattern!");
};
