// 链表节点定义（链表题通用）
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    // 相交链表：160(Easy)
    /*
    给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。
    如果两个链表不存在相交节点，返回 null 。
    注意：相交是指节点引用相同(同一个节点对象)，不是值相等。
     */
    // 思路：双指针"走对方走过的路"。pA/pB 分别从 headA/headB 出发，各走一步，
    //      走到末尾就跳到对方链表头继续。设 A 独有 a、B 独有 b、公共 c，
    //      两指针都走 a+b+c 步 → 必在相交点相遇；不相交则同时变 null 退出
    // 注意：!!!跳转到另一条链路的判断用 pA === null 而不是 pA.next === null：
    //      这样才能保证即使不相交的链路，在各自跑完两条路之后最后也一定『同时变为null』，从而能够退出
    // 时间 O(m+n)，空间 O(1)
    let pointerA = headA, pointerB = headB
    while (pointerA !== pointerB) {
        pointerA = (pointerA === null) ? headB : pointerA.next
        pointerB = (pointerB === null) ? headA : pointerB.next

    }
    return pointerA;
};
// 构建相交链表：A = a1→a2→c1→c2, B = b1→c1→c2 (从 c1 开始共享同一段节点)

// let c1 = new ListNode(8, new ListNode(9))          // 公共段 c1→c2
// let headA = new ListNode(1, new ListNode(2, c1))   // A: 1→2→8→9
// let headB = new ListNode(3, c1)                    // B: 3→8→9
// console.log(getIntersectionNode(headA, headB)?.val)  // 8 (即 c1)
// console.log(getIntersectionNode(new ListNode(1), new ListNode(2))?.val ?? null)  // null (不相交)

function reverseList(head: ListNode | null): ListNode | null {
    // 反转链表：206(Easy)
    /*
    给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
    输入：head = [1,2,3,4,5]
    输出：[5,4,3,2,1]
     */
    // 迭代法（三指针）：prev(已反转部分头)、cur(当前)、next(临时存下一个)
    // prev  cur   next
    // null   1  →  2  →  3  →  4  →  5
    // 每步：next=cur.next → cur.next=prev(掉转箭头) → prev=cur → cur=next
    // 坑：必须先存 next!!!prev一开始为null
    // 时间 O(n)，空间 O(1)

    // 另有递归解法：时间 O(n),空间 O(n)
    //    1. 反转后面： 1(head)  →  2  ←  3  ←  4  ←  5
    //    2. head.next.next=head：让2指向1
    //    3. head.next=null：让1不要指向2
    //    4. 递归的初始情况为0或者1长度的链路，返回本身

    // 方法一：迭代
    let prev: ListNode | null = null
    let cur = head
    while (cur !== null) {
        let next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    return prev

    // 方法二：递归
    // if (head === null || head.next === null) return head
    // let newHead = reverseList(head.next)
    // head.next.next = head
    // head.next = null
    // return newHead
};
// let list = new ListNode(1, new ListNode(2, new ListNode(3)))
// let r = reverseList(list)
// while (r) { console.log(r.val); r = r.next }  // 3 2 1

function isPalindrome(head: ListNode | null): boolean {
    // 回文链表：234(Easy)
    /*
    给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。
    输入：head = [1,2,2,1]
    输出：true
    进阶：能否用 O(n) 时间和 O(1) 空间解决？
     */
    // 思路一(O(1)空间)：使用『快慢指针』找到中点，反转后半段，然后比较：
    //      ① 快慢指针找中点(fast.next && fast.next.next) !!!注：这里需要判断空链或者长度为1的链
    //      ② 反转后半段(复用 206) ③ 从两端向中间比较，以后半段为终止条件(while p2)
    //      奇数节点时中间节点归前半、不参与比较；副作用是破坏了原链表(严格应比较完再反转回去)
    // 思路二(O(n)空间)：把所有 val 复制进数组，再用头尾双指针向中间比，代码最短
    // 时间都是 O(n)
    if (!head || !head.next) return true
    // find middle node
    let slow = head, fast = head
    while (fast.next && fast.next.next) { //!!在fast不能移动下一步或者下两步，slow都是不用移动的
        fast = fast.next.next
        slow = slow.next!
    }
    // reverse the link after middle node
    let prev: ListNode | null = null
    let cur = slow.next
    while (cur) {
        let next = cur.next
        cur.next = prev
        prev = cur
        cur = next
    }
    // compare
    let p1 = head, p2 = prev
    while (p2) {
        if (p2.val !== p1.val) return false
        p2 = p2.next
        p1 = p1.next!
    }
    return true;
};
// console.log(isPalindrome(new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1))))))  // true
// console.log(isPalindrome(new ListNode(1, new ListNode(2, new ListNode(3)))))  // false

function hasCycle(head: ListNode | null): boolean {
    // 环形链表：141(Easy)
    /*
    给你一个链表的头节点 head ，判断链表中是否有环。
    如果链表中存在环，则返回 true ；否则，返回 false 。
     */
    // 思路(快慢指针)：slow 走 1 步、fast 走 2 步。
    //      有环则快慢指针一定会相遇，无环的话fast会到null
    // 坑：循环条件 fast && fast.next(保证 fast.next.next 不空指针)；相遇判断放在移动之后
    // 时间 O(n)，空间 O(1)
    let fast = head, slow = head
    while (fast && fast.next) { //!!!不管是fast自己为null还是fast的下一步是null，都可以证明它能到null，那就没有环
        fast = fast.next.next
        slow = slow!.next
        if (fast === slow) { //!!!注意这里比较的不是val而是本身
            return true
        }
    }
    return false;
};
// 构建带环链表：1→2→3→ (回到 2)
// let n2 = new ListNode(2)
// let head = new ListNode(1, n2)
// n2.next = new ListNode(3, n2)   // 尾节点指回 n2 形成环
// console.log(hasCycle(head))     // true
// console.log(hasCycle(new ListNode(1, new ListNode(2))))  // false

function detectCycle(head: ListNode | null): ListNode | null {
    // 环形链表 II：142(Medium)
    /*
    给定一个链表的头节点 head ，返回链表开始入环的第一个节点。如果链表无环，则返回 null 。
    输入：head = [3,2,0,-4]，尾节点指回索引 1(节点2)
    输出：返回索引为 1 的链表节点(节点 2)
     */
    // 思路：① 快慢指针(同 141)找到相遇点(无环则 fast 到 null 返回 null)
    //      ② 相遇后，让新指针 p 从头出发、slow 留在相遇点，两者【同速】各走 1 步，
    //         再次相遇处即环入口
    // 证明：设 头→入口=a、入口→相遇点=b、相遇点→入口=c，环长=b+c。
    //      相遇时 slow 走 a+b、fast 走 2(a+b) 且 = a+b+n(b+c) → 化简得 a=(n-1)(b+c)+c
    //      即从头走 a 步 = 从相遇点走 c 步(+整数圈)，两者同时到达入口
    // 时间 O(n)，空间 O(1)
    return null;
};
// let n2 = new ListNode(2)
// let head = new ListNode(1, n2)
// n2.next = new ListNode(3, n2)   // 环入口是 n2
// console.log(detectCycle(head)?.val)  // 2
// console.log(detectCycle(new ListNode(1, new ListNode(2)))?.val ?? null)  // null