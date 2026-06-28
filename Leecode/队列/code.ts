/* 队列：
    deque = [  下标a , 下标b , 下标c  ]
           ↑                 ↑
         队头(head)        队尾(tail)
        deque[0]      deque[deque.length-1]
    队头 = 数组最左边 = deque[0] —— 这里存的是当前最大值的下标。
    队尾 = 数组最右边 = deque[deque.length-1] —— 这里是最近加进来的、最小的。
 */

function maxSlidingWindow(nums: number[], k: number): number[] {
    // 滑动窗口最大值：239(Hard)
    /*
    给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。
    返回 滑动窗口中的最大值 。
    示例 1：
    输入：nums = [1,3,-1,-3,5,3,6,7], k = 3
    输出：[3,3,5,5,6,7]
    解释：
    滑动窗口的位置                最大值
    ---------------               -----
    [1  3  -1] -3  5  3  6  7      3
    1 [3  -1  -3] 5  3  6  7       3
    1  3 [-1  -3  5] 3  6  7       5
    1  3  -1 [-3  5  3] 6  7       5
    1  3  -1  -3 [5  3  6] 7       6
    1  3  -1  -3  5 [3  6  7]      7
     */
    // KeyPoint：假设一个队列，尾部(即滑动窗口的右侧)新进来一个数x，
    // 如果 x 比左边的数都要大(或者相等)，那么x左边的数是不可能成为最大值的。
    // 因此在滑动区域(甚至可能的未来轮次)内有价值的只有x，x左边的数没有价值
    // 因为当滑动窗口移动的时候，x左边的数一定会先于x弹出去，那么最大值肯定是x

    // 维护一个双端队列[]，依次push数组的数，左侧(队头)正常弹出滑动窗口离开的部分；
    // 右侧需要新push进x时，先把队列里的小于x的数从右侧(队尾)弹出去，再把x放进去
    // 这样每次，其实当形成滑动窗口之后，队列的最左侧就是我们要求的最大值(队列是单调递减的，没有相等值)

    // 又因为需要控制滑动窗口长度，所以队列存『下标』而非『值』

    // 时间复杂度：O(n)，因为每个元素最多只会被push和pop一次
    //有n个元素被push，每次push时比较的次数=单次pop出去的元素，所以总push的比较数=总pop数
    // 总push次数=n，总pop次数≤ n 
    // 总操作 ≤ 2n  = O(n)
    let queue: number[] = []
    let res: number[] = []
    for (let i = 0; i < nums.length; i++) {
        let cur = nums[i]
        while (queue.length && nums[queue[queue.length - 1]] <= cur) {
            queue.pop()
        }
        queue.push(i)
        if (queue[0] <= i - k) {
            queue.shift()
        }
        if (i >= k - 1) { //这代表已经形成滑动窗口了
            res.push(nums[queue[0]])
        }
    }
    return res
};
// console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3))