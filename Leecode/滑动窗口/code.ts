// Set本身add/delete/has的时间复杂度都是O(1)，它的本质是Hash
// 而Array删除元素是O(n)，因为要移动后续元素
// 所以滑动窗口、去重都是用Set

function lengthOfLongestSubstring(s: string): number {
    // 无重复字符的最长子串：3(Medium)
    /*
    给定一个字符串 s ，请你找出其中不含有重复字符的 最长 子串 的长度。
    示例 1:
    输入: s = "abcabcbb"
    输出: 3 
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。注意 "bca" 和 "cab" 也是正确答案。
    示例 2:
    输入: s = "pwwkew"
    输出: 3
    解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
     */
    // 这里的子串是『连续』的，所以 -> 滑动窗口
    // 左指针固定，右指针每往右一步，set.add一个元素...直到遇到重复元素，break
    // ->左指针往右一步，set.delete一个元素
    let left = 0, right = 0, res = 0
    let set = new Set()
    while (left < s.length) {
        while (right < s.length) {
            let cur = s[right]
            if (!set.has(cur)) {
                set.add(cur)
                right++
            } else {
                break
            }
        }
        res = Math.max(res, right - left)
        set.delete(s[left])
        left++
    }
    return res
};
// console.log(lengthOfLongestSubstring("pwwkew"))

function findAnagrams(s: string, p: string): number[] {
    // 找到字符串中所有字母异位词：438(Medium)
    /*
    给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
    示例 1:
    输入: s = "cbaebabacd", p = "abc"
    输出: [0,6]
    解释:
    起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
    起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
     */
    // 本质上就是找所有的left开头，length=p.length的字符串，是p的异位词。关键在于怎么更快地比较两个词是异位词
    // 用一个26位的arr存储字母的个数，p有的-1，s有的+1，当arr的某一位为0代表differ少了一个。
    // -> differ为0代表互为异位词
    let differ = 0, res: number[] = []
    let arr = new Array(26).fill(0)
    for (let i = 0; i < p.length; i++) {
        arr[getAscii(s, i)]++
        arr[getAscii(p, i)]--
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            differ++
        }
    }
    for (let left = 0; left <= s.length - p.length; left++) {
        if (differ === 0) {
            res.push(left)
        }
        let lastLeftCharIndex = getAscii(s, left)
        arr[lastLeftCharIndex]--
        if (arr[lastLeftCharIndex] === 0) {
            differ--
        } else if (arr[lastLeftCharIndex] === -1) {
            differ++
        }
        let rightCharIndex = getAscii(s, left + p.length)
        arr[rightCharIndex]++
        if (arr[rightCharIndex] === 0) {
            differ--
        } else if (arr[rightCharIndex] === 1) {
            differ++
        }
    }
    return res

    function getAscii(str: string, index: number) {
        return str.charCodeAt(index) - 97
    }
};
// console.log(findAnagrams("cbaebabacd", "abc"))