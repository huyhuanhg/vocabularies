const vowels = ['a','o','u','e','i']
const consonants = ["b","c","d","f","g","h","j","k","l","m","n","p","q","r","s","t","v","w","x","y","z"]
const noSyntax = [{v0: '', v2: '', v3: ''}]

const getPresentOrPluralNounPattern= (keyword: string, sentence: string): string  => {
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

  switch(keyword.toLowerCase()) {
    case 'radius':
      keyword = 'radii';
      break;
    case 'basis':
      keyword = 'bases';
      break;
    case 'oasis':
      keyword = 'oases';
      break;
    case 'datum':
      keyword = 'data';
      break;
  }

  const pattern7_4 = baseGetPattern(keyword, sentence)

  if (pattern7_4) {
    return pattern7_4
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

  switch(keyword.toLowerCase()) {
    case 'foot':
      keyword = 'feet';
      break;
    case 'tooth':
      keyword = 'teeth';
      break;
    case 'goose':
      keyword = 'geese';
      break;
    case 'man':
      keyword = 'men';
      break;
    case 'woman':
      keyword = 'women';
      break;
    case 'mouse':
      keyword = 'mice';
      break;
    case 'child':
      keyword = 'children';
      break;
  }

  const pattern7_3 = baseGetPattern(keyword, sentence)

  if (pattern7_3) {
    return pattern7_3
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

  const removeFrOrFpattern = baseGetPattern(keyword.replace(/(f|fe)$/i, "ves"), sentence)
  // if (/^(calf|half|knife|leaf|life|loaf|self|shelf|thief|wife|wolf)$/i.test(keyword)) {
  //   return baseGetPattern(keyword.replace(/(f|fe)$/i, "ves"), sentence)
  // }
  if (removeFrOrFpattern) {
    return removeFrOrFpattern
  }

  // 5: nguyên âm + y. (a, o, u, e, i) + y

  // if ((new RegExp(`(${vowels.join('|')})y$`, 'i')).test(keyword)) {
  //   return baseGetPattern(`${keyword}s`, sentence)
  // }

  // 4

  if (/y$/i.test(keyword)) {
    return baseGetPattern(keyword.replace(/y$/i, "ies"), sentence)
  }

  // 2 & 3: Tận cùng s, ss, sh, ch, z, x & phụ âm + o
  if ((new RegExp(`((${consonants.join('|')})o)|s|sh|ch|z|x$`, 'i')).test(keyword)) {
    return baseGetPattern(`${keyword}es`, sentence)
  }

  // 5 (Tận cùng nguyên âm + y. (a, o, u, e, i) + y) & 1
  return baseGetPattern(`${keyword}s`, sentence)
}

const getContinueOrGerundPattern = (keyword: string, sentence: string): string => {
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
    return baseGetPattern(`${keyword}ing`, sentence)
  }

  // 4
  if (/ie$/i.test(keyword)) {
    return baseGetPattern(keyword.replace(/ie$/i, "ying"), sentence)
  }

  // 1
  if (/e$/i.test(keyword)) {
    return baseGetPattern(keyword.replace(/e$/i, "ing"), sentence)
  }

  // 3
  if (/c$/i.test(keyword)) {
    return baseGetPattern(`${keyword}king`, sentence)
  }

  const x2lastCharParttern = baseGetPattern(keyword.replace(/([a-z])$/i, '$1ing'), sentence)

  if (x2lastCharParttern) {
    return x2lastCharParttern;
  }

  return baseGetPattern(`${keyword}ing`, sentence)
}

const getSimplePastPattern = (keyword: string, sentence: string): string => {
  /**
   * https://vn.elsaspeak.com/thi-qua-khu-don-trong-tieng-anh/#Quy_tac_them_ed_va_cach_phat_am_duoi_ed_chuan_chinh
   */

  let pattern = baseGetPattern(`${keyword}d`, sentence)

  if (pattern) {
    return pattern
  }

  const x2lastCharParttern = baseGetPattern(keyword.replace(/([a-z])$/i, '$1ed'), sentence)

  if (x2lastCharParttern) {
    return x2lastCharParttern;
  }

  const replaceYPattern = baseGetPattern(keyword.replace(/y$/i, 'ied'), sentence)
  if (replaceYPattern) {
    return replaceYPattern;
  }

  return baseGetPattern(`${keyword}ed`, sentence)
}

const baseGetPattern = (keyword: string, sentence: string): string => {
  const normalRegex = new RegExp(`(^|\\W)(${keyword})(\\W|$)`, 'i');
  const matches = sentence.match(normalRegex)

  return matches ? matches[2] : ''
}

export const getPattern = (keyword: string, sentence?: string) => {
  if (!sentence) {
    throw new Error("Pattern: Not found sentence!")
  }

  // nornal
  const nornalPattern = baseGetPattern(keyword, sentence)

  if (nornalPattern) {
    return nornalPattern
  }

  // Vs / Ves | Ns / Nes
  let pattern = getPresentOrPluralNounPattern(keyword, sentence)

  if (pattern) {
    return pattern
  }

  // Ving
  pattern = getContinueOrGerundPattern(keyword, sentence)

  if (pattern) {
    return pattern
  }

  pattern = getSimplePastPattern(keyword, sentence)

  if (pattern) {
    return pattern
  }

  // no syntax
  const verbIndex = noSyntax.findIndex(verb => {
    const regex = new RegExp(`^${keyword}$`)
    return regex.test(verb.v0) || regex.test(verb.v2) || regex.test(verb.v3)
  })

  if (verbIndex !== -1) {
    pattern = baseGetPattern(`${noSyntax[verbIndex].v0}|${noSyntax[verbIndex].v2}|${noSyntax[verbIndex].v3}`, sentence)

    if (pattern) {
      return pattern
    }
  }

  throw new Error("Pattern: Not found pattern!")
}
