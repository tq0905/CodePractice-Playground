function twoSum(nums: number[], target: number): number[] {
    // 两数之和：1(Easy)
    /*
    给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
    你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

    输入：nums = [2,7,11,15], target = 9
    输出：[0,1]
    解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

    输入：nums = [3,2,4], target = 6
    输出：[1,2]
     */
    let mp = new Map()
    for (let i = 0; i < nums.length; i++) {
        let cur = nums[i]
        if (mp.has(target - cur)) {
            return [mp.get(target - cur), i]
        }
        // !!! 一定要先return后set，避免它重复计算自己 !!!
        mp.set(cur, i)
    }
    return []
};
// console.log(twoSum([3,2,4],6))

function groupAnagrams(strs: string[]): string[][] {
    // 字母异位词分组：49(Medium)
    /*
    输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
    输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
    解释：
    在 strs 中没有字符串可以通过重新排列来形成 "bat"。
    字符串 "nat" 和 "tan" 是字母异位词，因为它们可以重新排列以形成彼此。
    字符串 "ate" ，"eat" 和 "tea" 是字母异位词，因为它们可以重新排列以形成彼此。
     */
    // 所有的字母异位词应该有同一个hash key
    let mp: Record<string, string[]> = {}
    let res: string[][] = []
    for (let str of strs) {
        let charArr = str.split('')
        let key = charArr.sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0)).join()
        if (!mp[key]) {
            mp[key] = []
        }
        mp[key].push(str)
    }
    for (let key in mp) {
        res.push(mp[key])
    }
    return res
};
// console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))

function longestConsecutive(nums: number[]): number {
    //最长连续序列：128(Medium)
    /*
    给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
    请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
    输入：nums = [100,4,200,1,3,2]
    输出：4
    解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
     */
    // 首先需要注意输入可能有重复的数
    // 每当一个num的num-1在set里，就代表num不是tail，找到head然后一直往下+1+1+1
    let set = new Set(nums)
    let res = 0
    for (let num of set) { // !!!一定记得是遍历set而非array
        if (!set.has(num - 1)) {
            let head = num
            let length = 1
            let tail = num + 1
            while (set.has(tail)) {
                length++
                tail++
            }
            res = Math.max(res, length)
        }
    }
    return res
};
// console.log(longestConsecutive([100, 4, 200, 1, 3, 2]))

function subarraySum(nums: number[], k: number): number {
    // 和为 K 的子数组：560(Medium)
    /*
    给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的子数组的个数 。
    子数组是数组中元素的连续非空序列。
    示例 1：
    输入：nums = [1,1,1], k = 2
    输出：2
    示例 2：
    输入：nums = [1,2,3], k = 3
    输出：2
     */
    // 这道题不能用滑动窗口，因为不一定都是正数
    // 连续子数组 = 两个前序和相减
    // 当我们得到一个前序和的数组，本质这就是一个两数之和
    // 和 两数之和 的区别：!!!需要找到所有的答案!!! 所以hash表要存某个pre的值出现的全部数量
    // pre2-pre1=k -> pre1=pre2-k
    let sum = 0, res = 0
    let mp = new Map()
    mp.set(0, 1) //一定有一个前序和=0
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
        res += (mp.get(sum - k) || 0)
        mp.set(sum, (mp.get(sum) || 0) + 1)
    }
    return res
};
// console.log(subarraySum([1, 2, 3], 3))