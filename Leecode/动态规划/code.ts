function maxSubArray(nums: number[]): number {
    // 最大子数组和：53(Medium)
    /*
    给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
    输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
    输出：6  // 连续子数组 [4,-1,2,1] 的和最大，为 6
     */
    // 解法1-前序和：不断计算前序和，以及保留前序和中的min就可以。需要注意res一开始为负无穷
    // 解法2-动态规划：以每个位置结尾的最大子数组和，只有两种选择
    //     ①把前面的和接上：cur + nums[i]；②从当前位置重新开始：nums[i]
    //     如果前面累加的和cur<0，那它只会拖累后面，果断丢弃从nums[i]重开

    //前序和
    // let res = -Infinity //!!!这很重要，初始值不是0
    // let sum = 0, minPre = 0
    // for (let i = 0; i < nums.length; i++) {
    //     sum += nums[i]
    //     res = Math.max(res, sum - minPre)
    //     minPre = Math.min(minPre, sum)
    // }
    // return res

    // 动态规划
    let res = -Infinity, pre = 0
    for (let i = 0; i < nums.length; i++) {
        let curMax = Math.max(pre + nums[i], nums[i])
        res = Math.max(curMax, res)
        pre = curMax
    }
    return res
};
// console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
