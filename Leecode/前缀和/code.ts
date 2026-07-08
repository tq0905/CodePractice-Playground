function productExceptSelf(nums: number[]): number[] {
    // 除自身以外数组的乘积：238(Medium)
    /*
    给你一个整数数组 nums，返回数组 answer，其中 answer[i] 等于 nums 中除了 nums[i]
    之外其余各元素的乘积。要求不使用除法，且在 O(n) 时间复杂度内完成。
    输入：nums = [1,2,3,4]
    输出：[24,12,8,6]
    提示：2 <= nums.length <= 105
    提问：如何在 O(1) 的额外空间复杂度内完成这个题目吗？输出数组(也就是下面的res) 不被视为 额外空间。
     */
    // 思路：前缀积 × 后缀积（遍历2遍分别获得）
    let res: number[] = [1]
    for (let i = 1; i < nums.length; i++) {
        res[i] = res[i - 1] * nums[i - 1]
    }
    let right = 1
    for (let i = nums.length - 1; i >= 0; i--) {
        res[i] = res[i] * right
        right = right * nums[i]
    }
    return res;
};
// console.log(productExceptSelf([1, 2, 3, 4]))
