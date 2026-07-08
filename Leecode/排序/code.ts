function merge(intervals: number[][]): number[][] {
    // 合并区间：56(Medium)
    /*
    以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
    请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
    输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
    输出：[[1,6],[8,10],[15,18]]
     */
    // 先按左端点start排序，这样能重叠的区间一定相邻
    // 遍历时拿当前区间和res里最后一个区间比：
    //   如果当前的start <= 上一个的end，说明重叠，把上一个的end扩大为两者"较大值"
    //   否则不重叠，直接把当前区间push进res
    intervals.sort((a, b) => a[0] - b[0])
    const res: number[][] = [intervals[0]]
    for (let i = 1; i < intervals.length; i++) {
        let cur = intervals[i]
        let pre = res[res.length - 1]
        if (pre[1] >= cur[0]) {
            res[res.length - 1][1] = Math.max(pre[1], cur[1]) //注意这里pre的不一定比cur的小
        } else {
            res.push(cur)
        }
    }
    return res
};
// console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]))
