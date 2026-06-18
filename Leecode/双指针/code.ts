function moveZeroes(nums: number[]): void {
    // 移动0：(Easy)
    /*
    给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
    请注意 ，必须在不复制数组的情况下原地对数组进行操作。
    输入: nums = [0,1,0,3,12]
    输出: [1,3,12,0,0]
    */
    let left = 0
    let right = 0
    while (right !== nums.length) {
        if (nums[right] !== 0) {
            nums[left] = nums[right]
            left++
        }
        right++
    }
    while (left !== nums.length) {
        nums[left] = 0
        left++
    }
};
// let arr = [0, 1, 0, 3, 12]
// moveZeroes(arr)
// console.log(arr)

function maxArea(height: number[]): number {
    // 盛水最多的容器：11(Medium)
    /*
    给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
    找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
    返回容器可以储存的最大水量
    输入：[1,8,6,2,5,4,8,3,7]
    输出：49 
     */
    // 左右两个木板，短边决定盛水，如果短边不动，长边无论如何往中间移动都不可能盛水更多
    let left = 0
    let right = height.length - 1
    let res = 0
    while (left < right) {
        let area = Math.min(height[left], height[right]) * (right - left)
        res = Math.max(res, area)
        if (height[left] <= height[right]) {
            left++
        } else {
            right--
        }
    }
    return res
};
// console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))

function threeSum(nums: number[]): number[][] {
    // 三数之和：15(Medium)
    /*
    给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请你返回所有和为 0 且不重复的三元组。
    注意：答案中不可以包含重复的三元组。

    输入：nums = [-1,0,1,2,-1,-4]
    输出：[[-1,-1,2],[-1,0,1]]
    解释：
    nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
    nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
    nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
    不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
    注意，输出的顺序和三元组的顺序并不重要。
     */
    // 先排序，然后从左选一个数x为基准，在它的右边找到两个数之和=-x，用左右指针逼近
    // 注意：数字有可能是一样的，需要排除重复情况（对target、left、right都是）
    let res = []
    const sortArr = nums.sort((a, b) => a - b)
    for (let i = 0; i < sortArr.length - 2; i++) {
        if (sortArr[i] > 0) break //如果最小的数都大于0，不可能有它和它右边的另外两个数，加起来为0
        if (i > 0 && sortArr[i] === sortArr[i - 1]) {
            continue
        }
        let target = -sortArr[i]
        let left = i + 1
        let right = sortArr.length - 1
        while (left < right) {
            if (left > i + 1 && sortArr[left] === sortArr[left - 1]) {
                left++
                continue
            }
            if (right < sortArr.length - 1 && sortArr[right] === sortArr[right + 1]) {
                right--
                continue
            }
            let sum = sortArr[left] + sortArr[right]
            if (sum === target) {
                res.push([sortArr[i], sortArr[left], sortArr[right]])
                left++
                right--
            } else if (sum < target) {
                left++
            } else {
                right--
            }
        }
    }
    return res
};
// console.log(threeSum([-1, 0, 1, 2, -1, -4]))

function trap(height: number[]): number {
    // 接雨水：42(Hard)
    /*
    给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
    输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
    输出：6
    输入：height = [4,2,0,3,2,5]
    输出：9
     */
    // 每个pos的雨水(当pos本身比较矮) = Math.min(pos左边的最高的柱子leftMax，pos右边的最高的柱子rightMax)-pos自己的高度
    // 对于一个pos来说，其实只有更小的那个lefMax/rightMax是有意义的
    // example：leftMax更小，rightMax往左只能继续++或不变，那仍然是使用leftMax计算
    // 注意：因为要计算每个pos而非间隔，所以要计算left=right的情况
    let left = 0
    let right = height.length - 1
    let leftMax = 0
    let rightMax = 0
    let res = 0
    while (left <= right) {
        if (leftMax <= rightMax) {
            res += Math.max(0, leftMax - height[left])
            leftMax = Math.max(leftMax, height[left])
            left++
        } else {
            res += Math.max(0, rightMax - height[right])
            rightMax = Math.max(rightMax, height[right])
            right--
        }
    }
    return res
};
// console.log(trap([4, 2, 0, 3, 2, 5]))