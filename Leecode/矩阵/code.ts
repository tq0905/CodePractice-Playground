function setZeroes(matrix: number[][]): void {
    // 矩阵置零：73(Medium)
    /*
    给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。
    请使用原地算法。
    输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
    输出：[[1,0,1],[0,0,0],[1,0,1]]
    进阶：能否用 O(1) 的额外空间解决？
     */
    // 坑：不能边遍历边置零，会把新产生的 0 误当成原本的 0，需先标记后统一置零
    // O(1)空间+O(m×n)时间：
    //    1.先记住第1行+第1列是否需要 置为 0
    //    2.!!!复用第一行、第一列当标记位!!!：[i,j]为0 -> martix[i,0]=0, martix[0,j]=0
    //    为什么需要先做1：举个例子，最后我们希望：martix[0,j]只能决定第j列置0，
    //    但如果原本第0行就存在一个martix[0,j1]==0，它本来应该决定第0行和第j列都为0
    //    记住1之后，第一行+第一列里的原本的0就能够承担希望的效果，所以也不需要重新去设置了，可以从[1,1]开始遍历
    let m = matrix.length, n = matrix[0].length
    let firstRowZero = false, firstColZero = false
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowZero = true
        }
    }
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColZero = true
        }
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0
                matrix[0][j] = 0
            }
        }
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[0][j] === 0 || matrix[i][0] === 0) {
                matrix[i][j] = 0
            }
        }
    }
    if (firstColZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0
        }
    }
    if (firstRowZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0
        }
    }
};
// let martix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]];
// setZeroes(martix);
// console.log(martix)

function spiralOrder(matrix: number[][]): number[] {
    // 螺旋矩阵：54(Medium)
    /*
    给你一个 m x n 的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
    输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
    输出：[1,2,3,4,8,12,11,10,9,5,6,7]
     */
    // 思路：维护 top/bottom/left/right 四条边界指针，一圈固定四步(右→下→左→上)，
    //      每走完一个方向就把对应边界向内收缩一格，直到边界交错
    // 坑：非正方形矩阵在走完前两步后可能出现 top>bottom 或 left>right，
    //     第3、4步(向左/向上)前要各加一次边界判断，否则会反向重复访问。向左需要判断top/bottom
    // 时间 O(m×n)：每个元素恰好访问一次。空间 O(1)：不算输出数组，只用了四个边界变量。
    const res: number[] = []
    let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0]?.length - 1
    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) {
            res.push(matrix[top][i])
        }
        top++
        for (let i = top; i <= bottom; i++) {
            res.push(matrix[i][right])
        }
        right--
        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                res.push(matrix[bottom][i])
            }
            bottom--
        }
        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                res.push(matrix[i][left])
            }
            left++
        }
    }
    return res;
};
// console.log(spiralOrder([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))

function rotate(matrix: number[][]): void {
    // 旋转图像：48(Medium)
    /*
    给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
    要求：原地旋转，不能使用另一个矩阵。
    输入：matrix = 
    [[1,2,3],
     [4,5,6],
     [7,8,9]]
    输出：
    [[7,4,1],
     [8,5,2],
     [9,6,3]]
     */
    // 思路：顺时针 90° = 先沿主对角线转置(matrix[i][j] ↔ matrix[j][i])，再左右翻转每一行
    // 坑：转置只遍历上三角(对角线不用翻转)，否则每对元素换两次等于没换
    // 逆时针 90° 的话，把第二步改成「每列上下翻转」
    // 时间 O(n²)，空间 O(1)(原地交换)
    const n = matrix.length
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) { //!!!这里j的起始值很重要
            let temp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = temp
        }
    }
    for (let i = 0; i < n; i++) {
        let left = 0, right = n - 1
        while (left < right) {
            let temp = matrix[i][left]
            matrix[i][left] = matrix[i][right]
            matrix[i][right] = temp
            left++
            right--
        }
    }
};
// let matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// rotate(matrix1)
// console.log(matrix1)

function searchMatrix(matrix: number[][], target: number): boolean {
    // 搜索二维矩阵 II：240(Medium)
    /*
    编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。
    该矩阵具有以下特性：每行从左到右升序、每列从上到下升序。
    输入：matrix = 
    [[1,4,7,11,15],
     [2,5,8,12,19],
     [3,6,9,16,22],
     [10,13,14,17,24],
     [18,21,23,26,30]],
    target = 5
    输出：true
     */
    // 思路：二分法Z字查询。从右上角出发，移动方向只有左(减小)/下(增加)。
    // 如果当前值比target大->往左；如果当前值比target小->向下
    // 左下角开始也行，但另外左上角/右下角不行，因为两个移动方向都是增大/减小
    // !!!注意不能先只移动行去找到第一个尾部大于自己的行，整个矩阵不是严格从左到右再到下一行的左单调递增的
    // 时间 O(m+n)，空间 O(1)
    const m = matrix.length, n = matrix[0]?.length
    let row = 0, col = n - 1
    while (row < m && col >= 0) {
        let cur = matrix[row][col]
        if (cur === target) return true
        else if (cur > target) {
            col--
        } else {
            row++
        }
    }
    return false;
};
// console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5))
