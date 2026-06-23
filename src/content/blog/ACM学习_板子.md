---
title: '板子'
description: 'study notes'
publishDate: 2026-05-29
category: algorithm
tags: []
---

[toc]

### 小常识

```cpp
#include <bits/stdc++.h>
char c='a';
if(c&' ')//判断是否为小写
if(~c&' ')//判断是否为大写
c|=' ';//转换为小写，等价于std::tolower
c^=' ';//如果原本是大写，转换为小写，原本是小写转换为大写。
c=(c|' ')^' ';//转换为大写字母，等价于std::toupper
vector a(n,vector<int>(m));//这样写
__builtin_popcount = int
__builtin_popcountl = long int
__builtin_popcountll = long long
__builtin_popcount(x)//返回x的二进制中 1 的个数
__builtin_ffs(x)//返回x的二进制中最小的 1 的位置，位置从 1 开始
__builtin_clz(x)//返回x的二进制中前导 0 的个数
for(int s=sub;s;s=(s-1)&sub)// 遍历子集
std::stoi(string& s)//字符串转化为int 例：int tem=stoi(s);
std::stol(string)//long 
std::stoll(string)//long long 
auto dfs=[&](auto self,node<T>*root){/*code*/};//由于lambda函数里不能调用自己，通过self代替
dfs(dfs,/*...*/)
function<void(int, int...)> dfs=[&](int x,int y...){/*code*/}
dfs(/*...*/)
const int base = 13331;//hash 每次乘法前 (__int128_t)
const ll mod = 4611686018427387847;

```

### 快读快写

```cpp
void print(int x){
    if(x<0){putchar('-');x=-x;}
    if(x>9)print(x/10);
    putchar(x%10+'0');
}
ll read(){
    ll x=0,f=1;char ch=getchar();
    while(ch<'0'||ch>'9'){if(ch=='-')f=-1;ch=getchar();}
    while(ch>='0'&&ch<='9'){x=(x<<1)+(x<<3)+(ch^48);ch=getchar();}
    return x*f;
}
ios::sync_with_stdio(false);
cin.tie(0);cout.tie(0);

freopen("1.in","r",stdin);
freopen("1.out","w",stdout);
fflush(stdout);//交互题
```

### pbds库：平衡树

```cpp
// 与define int long long 冲突，赣
#include <ext/pb_ds/assoc_container.hpp>
#include <ext/pb_ds/tree_policy.hpp>//用tree
#include <ext/pb_ds/hash_policy.hpp>//用hash
#include <ext/pb_ds/trie_policy.hpp>//用trie
#include <ext/pb_ds/priority_queue.hpp>//用priority_queue
#include <bits/extc++.h>//pbds的万能头
// 命名空间namespace __gnu_cxx;
// 命名空间namespace __gnu_pbds;

struct custom_hash {
    static uint64_t splitmix64(uint64_t x) {
        // http://xorshift.di.unimi.it/splitmix64.c
        x += 0x9e3779b97f4a7c15;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        return x ^ (x >> 31);
    }

    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM);
    }
};
// __gnu_pbds::gp_hash_table<int,int,custom_hash>mp;
__gnu_pbds::gp_hash_table<int,int>mp;//hash 常用
__gnu_pbds::cc_hash_table<int,int>mp;

template <class T> using rbtree = __gnu_pbds::tree<
    T,
    __gnu_pbds::null_type,
    std::less<T>,
    __gnu_pbds::rb_tree_tag,
    __gnu_pbds::tree_order_statistics_node_update
>;
```

```cpp
// 解释
T //存储的类型
null_type //无映射
std::less<T> //从小到大排序
rb_tree_tag //红黑树
tree_order_statistics_node_update //更新方式
// 使用 
rbtree<T> tr;
tr.insert(T()); //插入;
tr.erase(T()); //删除;
tr.find_by_order(k); //找k小值，返回迭代器
tr.order_of_key(T()); //求排名 若原树中无key则加入
tr.join(b); //将b并入tr，前提是两棵树类型一样且没有重复元素 
tr.split(v,b); //分裂，key小于等于v的元素属于tr，其余的属于b
tr.lower_bound(x); //返回第一个大于等于x的元素的迭代器
tr.upper_bound(x); //返回第一个大于x的元素的迭代器
//以上所有操作的时间复杂度均为O(logn) 
/*
```

### ST表

```cpp
int a[N];
int mx[N][20];// int log_2[100005]={-1};
int main()
{
    for(int j=1;(1<<j)<=n;j++)
        for(int i=1;i-1+(1<<j)<=n;i++)
            mx[i][j]=max(mx[i][j-1],mx[i+(1<<(j-1))][j-1]);
    int tt=log2(r-l+1);// int tt=log_2[r-l+1];
    int ans=max(mx[l][tt],mx[r-(1<<tt)+1][tt]);
    return 0;
}
```

### 树状数组

```cpp
//对一组数实现：
int n=1;int tr[N];
void add(int x, ll k){for(;x<=n;x+=(x&-x))tr[x]+=k;}//单点加
ll sum(int x){ll res=0;for(;x;x-=(x&-x))res+=tr[x];return res;}//前缀和
```

### exgcd()

返回值为gcd(a,b)

```cpp
#define ll long long
ll exgcd(ll a,ll b,ll &x,ll &y){//输入：ax+by=gcd(a,b)
    if(!b){
        x=1;y=0;
        return a;
    }else{
        ll tx,ty;
        ll d=exgcd(b,a%b,tx,ty);
        x=ty;y=tx-(a/b)*ty;
        return d;
    }
}
```

### 线性基(?)

```cpp
vector<ll>B;
void insert(ll x){
    for(auto b:B)x=min(x,b^x);
    for(auto& b:B)b=min(b,b^x);
    if(x)B.push_back(x);
}
```

### 卢卡斯定理

![](/images/image.png)

```cpp
// 需要先预处理出fact[]，即阶乘
inline ll C(ll m,ll n,ll p){
    return m<n?0:fact[m]*inv(fact[n],p)%p*inv(fact[m-n],p)%p;
}
inline ll lucas(ll m,ll n,ll p){
    return n==0?1%p:lucas(m/p,n/p,p)*C(m%p,n%p,p)%p;
}
```

### LCA

```cpp
// 给定一棵树求得x和y的最近公共祖先
vector<int>e[N];
int dep[N];
int pa[N][20];
void dfs(int x,int fa=0){
    dep[x]=dep[fa]+1;
    pa[x][0]=fa;
    for(auto id:e[x]){
        if(id==fa)continue;
        dfs(id,x);
    }
}
int LCA(int x,int y){
    if(dep[x]>dep[y])swap(x,y);
    int up=0;
    while((1<<(up+1))<=dep[y])++up;
    for(int i=up;i>=0;--i){
        if((1<<i)<=dep[y]-dep[x])y=pa[y][i];
    }
    if(x==y)return x;
    for(int i=up;i>=0;--i){
        if(pa[x][i]!=pa[y][i]){
            x=pa[x][i];
            y=pa[y][i];
        }
    }
    return pa[x][0];
}
dfs(s);
for(int up=1;(1<<up)<=n;++up){
    for(int i=1;i<=n;++i){
        pa[i][up]=pa[pa[i][up-1]][up-1];
    }
}
```

### sosdp 高维前缀和

给定序列 $\{a_0, a_1, \dots, a_{2^n-1}\}$，对每个下标 $i$（$0 \leq i \leq 2^n - 1$），计算：$ f(i) = \sum_{\substack{j \subseteq i}} a_j$

```cpp
int dp[1000005];
int main(){
    int n,m;
    scanf("%d%d",&n,&m);
    for(int i=m-1;i>=0;--i)
        scanf("%d",&dp[i]);
    int i;
    for(i=0;(1<<i)<n;++i)
        for(int j=n-1;j>0;--j)
            if(j&(1<<i))dp[j]=dp[j]^dp[j^(1<<i)];
    for(int k=0;k<n;++k)
        printf("%d ",dp[k]);
    return 0;
}
```

### tarjan

```cpp
// 给定一个双向图，可求得割边
int low[N],dfn[N];
bool via[N];
vector<int> e[N];
int step=0;
void tarjan(int x,int fa){//只适用双向图,原因是单向图有横向边
    dfn[x]=++step;;//时间戳
    low[x]=step;//与之连成环的其中一个非父亲元素的时间戳
    via[x]=true;//该点已经访问过了，防止再次访问
    for(auto id:e[x]){
        if(!via[id])tarjan(id,x);
        if(id!=fa)low[x]=min(low[x],low[id]);
    }
}
//当dfn(x)<low(y)时：x--y为割边（dfn(x)<dfn(y)是比较的前提）
//理由：dfn(y)>=low(y)>dfn(x),时间戳靠后的y会取时间戳靠前的low中最小值（包括x!!!）
```

### tarjan-SCC

```cpp
// 给定一个有向图，可求强连通分量(SCC)及其缩点DAG
int low[N],dfn[N];
bool inStk[N];
vector<int> stk;
vector<int> e[N];
int scc[N],scc_sz[N],scc_cnt;//scc[i]=i所属SCC编号, scc_sz[i]=第i个SCC的大小
int step;
void tarjan(int x){
    dfn[x]=low[x]=++step;
    stk.push_back(x);inStk[x]=true;
    for(int nxt:e[x]){
        if(!dfn[nxt])tarjan(nxt),low[x]=min(low[x],low[nxt]);
        else if(inStk[nxt])low[x]=min(low[x],dfn[nxt]);//回边,用dfn而非low
    }
    if(low[x]==dfn[x]){//x是SCC的根
        int y;++scc_cnt;
        do{
            y=stk.back();stk.pop_back();
            inStk[y]=false;
            scc[y]=scc_cnt;
            ++scc_sz[scc_cnt];
        }while(y!=x);
    }
}
//scc_cnt 从 1 开始编号；缩点后 scc 编号大的先出栈,是拓扑序靠前的(源),编号小的是汇点
//缩点建图: for(u)for(v:e[u])if(scc[u]!=scc[v])ce[scc[u]].push_back(scc[v]);
//判环: scc_sz[i]>1 一定含环; scc_sz[i]==1 时需额外判自环 if(u==v)则也有环
//Tarjan 的 SCC 编号是逆拓扑序，比如联通块 ce[2] 可能指向 ce[1]，但 ce[1] 不可能指向 ce[2]，所以顺序执行 ce[i] 的 DP 就行了
```
```

### manacher

给定一个长度为 $n$ 的字符串 $s$，找到所有对 $(i, j)$ 使得子串 $s[i \dots j]$ 为一个回文串。

```cpp
int f[N<<1];
void manacher(string& s){
    string str;
    int r=1,mid=1;
    str+="^#";
    for(auto id:s){
        str.push_back(id);
        str.push_back('#');
    }
    str.push_back('$');
    for(int i=2;i<str.size();++i){        
        if(i+f[2*mid-i]<r){
            f[i]=f[2*mid-i];
            continue;
        }
        r=max(r,mid=i);
        while(str[r+1]==str[2*mid-r-1])++r;
        f[i]=r-mid;
    }
}
```

### 斯特林数

第二类Stirling数(斯特林数):

将n个不同的元素拆分成m个集合的方案数:

$$
S(n, m) = \frac{1}{m!} \sum_{k=0}^m (-1)^k \binom{m}{k} (m-k)^n
$$

(1)n个不同的球，放入m个无区别的盒子，不允许盒子为空。

方案数：$S(n,m)$

(2)n个不同的球，放入m个有区别的盒子，不允许盒子为空。

方案数：$m!S(n,m)$ 。因盒子有区别，乘上盒子的排列即可。

(3)n个不同的球，放入m个无区别的盒子，允许盒子为空。

方案数：$\sum_{k=0}^m S(n,k)$ 。枚举非空盒的数目便可。

```cpp
int A[N],inv[N];
int power(int x,int y){
    int res=1;
    while(y){if(y&1)res=res*x%mod;y>>=1;x=x*x%mod;}
    return res;
}
void init(){
    A[0]=inv[0]=1;
    for(int i=1;i<N;++i){
        A[i]=A[i-1]*i%mod;
        inv[i]=power(A[i],mod-2);
    }
}
ll S(int n,int m){
    ll res=0,f=1;
    for(int k=0;k<=m;++k){
        int temp=inv[m-k]%mod*inv[k]%mod*power(m-k,n)%mod;
        res=((res+temp*f)%mod+mod)%mod;
        f*=-1;
    }
    return res;
}
```

### 贝尔树
$B_n$ 是基数为 $n$ 的集合的划分方法的数目．
每个贝尔数都是相应的 **第二类斯特林数** 的和
因为第二类斯特林数是把基数为 $n$ 的集合划分为正好 $k$ 个非空集的方法数目
```cpp
// 贝尔树：每个节点的子树个数等于该节点的子树的子树个数之和加 1
// 贝尔数：贝尔树的节点个数
// 贝尔数的递推：B(n+1)=sum(k=0,n,C(n,k)*B(k))
/*
1
1   2
2   3   5
5   7   10   15
15  20  27   37   52
52  67  87   114  151 203
203 255 322  409  523 674 877
每行的首项是贝尔数．可以利用这个三角形来递推求出贝尔数
*/ 
constexpr int MAXN = 2000 + 5;
int bell[MAXN][MAXN];

void f(int n) {
  bell[0][0] = 1;
  for (int i = 1; i <= n; i++) {
    bell[i][0] = bell[i - 1][i - 1];
    for (int j = 1; j <= i; j++)
      bell[i][j] = bell[i - 1][j - 1] + bell[i][j - 1];
  }
}

```

### 01字典树

```cpp
int tol; //节点个数 
LL val[32*MAXN]; //点的值 
int ch[32*MAXN][2]; //边的值 

void init(){ //初始化 
    tol=1;
    ch[0][0]=ch[0][1]=0;
}

void insert(LL x){ //往 01字典树中插入 x 
    int u=0;
    for(int i=32;i>=0;i--)
    {
        int v=(x>>i)&1;
        if(!ch[u][v])
        { //如果节点未被访问过 
            ch[tol][0]=ch[tol][1]=0; //将当前节点的边值初始化 
            val[tol]=0; //节点值为0，表示到此不是一个数 
            ch[u][v]=tol++; //边指向的节点编号 
        }
        u=ch[u][v]; //下一节点 
    }
    val[u]=x; //节点值为 x，即到此是一个数 
}
LL query(LL x){ //查询所有数中和 x异或结果最大的数 
    int u=0;
    for(int i=32;i>=0;i--)
    {
        int v=(x>>i)&1;//利用贪心策略，优先寻找和当前位不同的数 
        if(ch[u][v^1]) u=ch[u][v^1];
        else u=ch[u][v];
    }
    return val[u]; //返回结果 
}
```

### 高斯消元法

```cpp
//数组a存放系数，数组x为答案
const int N=105;
double a[N][N];
double x[N];
double eps=1e-6;
int solve(int n,int m)//n行m列:n个方程，解m个未知数
{
    int maxr,r,c;
    for(r=1,c=1;r<=n&&c<=m;r++,c++){
        maxr=r;
        for(int i=r+1;i<=n;i++)if(fabs(a[i][c])>fabs(a[maxr][c]))maxr=i;
        if(maxr!=r)swap(a[maxr],a[r]);
        if(fabs(a[r][c])<eps){r--;continue;}
        for(int i=r+1;i<=n;i++)if(fabs(a[i][c])>eps)
        {
            double k=a[i][c]/a[r][c];
            for(int j=c+1;j<=m+1;j++)a[i][j]-=a[r][j]*k;
        }
    }
    r--;//r为单位元个数
    for(int i=r+1;i<=n;i++)if(fabs(a[i][m+1])>eps)return -1;//无解
    if(r<m)return m-r;                                      //无穷多解，返回自由解的个数
    for(int i=m;i>=1;i--){
        x[i]=a[i][m+1]/a[i][i];
        for(int j=1;j<i;j++)a[j][m+1]-=a[j][i]*x[i];
    }
    return 0;
}
```

### KMP

```cpp
//给定s1和s2,可求得s2在s1的位置(头位置)，s2的border
void KMP(string s1,string s2,vector<int>&border){
    border.resize(s2.size());
    int j=0;
    for(int i=1;i<s2.size();i++)
    {
        if(!j&&s2[j]!=s2[i])continue;
        while(j&&s2[j]!=s2[i])j=border[j-1];
        if(s2[j]==s2[i])border[i]=++j;
    }
    j=0;
    for(int i=0;i<s1.size();i++)
    {
        if(!j&&s2[j]!=s1[i])continue;
        while(j&&s2[j]!=s1[i])j=border[j-1];
        if(s2[j]==s1[i])j++;
        if(j==s2.size())
        {
            printf("%d\n",i-j+2);//位置在这里
            j=border[j-1];
        }
    }
}
```

### AC自动机

给定一个文本串 $S$ 和 $n$ 个模式串 $T_{1∼n}$，可分别求出每个模式串 $T_i$ （不相同）在 $S$ 中出现的次数。

```cpp
const int N=1e6+5;
// const int N=15;
struct node{
    int son[26];
    int num;//记录该节点作为最后一个字符的情况，如 T 串 id（需各不相同）、T 串个数
    int fail;
}trie[N];
int tot=1;
void Add(string s){
    int p=1;
    for(auto id:s){
        int tem=id-'a';
        if(!trie[p].son[tem])trie[p].son[tem]=++tot;
        p=trie[p].son[tem];
    }
    ++trie[p].num;
}
void getFail(){
    queue<int>q;
    for(int i=0;i<26;++i)trie[0].son[i]=1;    
    q.push(1);trie[1].fail=0;                
    while(!q.empty()){
        int u=q.front();q.pop();
        for(int i=0;i<26;++i){                
            int v=trie[u].son[i];            
            int Fail=trie[u].fail;            
            if(!v){trie[u].son[i]=trie[Fail].son[i];continue;}    
            trie[v].fail=trie[Fail].son[i];    
            q.push(v);
        }
    }
}
int query(string s){
    int ans=0;
    int p=1;
    for(auto id:s){
        int k=trie[p].son[id-'a'];
        while(k!=1&&trie[k].num!=-1){
            ans+=trie[k].num;
            trie[k].num=-1;
            k=trie[k].fail;
        }
        p=trie[p].son[id-'a'];
    }
    /*骨干
    for(auto id:s){
        p=trie[p].son[id-'a'];
    }
    */
    return ans;
}
void solve(){
    int n=read();
    string s;
    for(int i=1;i<=n;++i){
        cin>>s;Add(s);
    }
    getFail();
    cin>>s;
    cout<<query(s);
}
```

### 网络流-dinic

时间复杂度 $O(|V|^2|E|)$。

在单位容量的网络上，Dinic 算法的总时间复杂度是 $O(|E| \min(|E|^\frac{1}{2},|V|^{\frac{2}{3}}))$

```cpp
const int N=3e3+5;
struct Flow{
    int INF = 0x7fffffff;
    struct node{
        int to,cap,rev;//流向、容量、存反向边位置
    };
    vector<node>e[N];
    int dep[N];
    int cur[N];
    int n,S,T;//n在函数中代表了点的情况(n个点或最大点下标)
    Flow(int _n=0,int _S=0,int _T=0):n(_n),S(_S),T(_T){}
    void add(int x,int y,int cap){//建图
        e[x].push_back((node){y,cap,(int)e[y].size()});//vector建图的丑态罢了
        e[y].push_back((node){x,0,(int)e[x].size()-1});
    }
    bool bfs(){
        memset(dep,-1,sizeof(dep));
        memset(cur,0,sizeof(cur));
        dep[S]=0;queue<int>q;q.push(S);
        while(!q.empty()){
            int x=q.front();q.pop();
            if(x==T)break;
            for(auto id:e[x]){
                if(id.cap>0&&dep[id.to]==-1){
                    dep[id.to]=dep[x]+1;
                    q.push(id.to);
                }
            }
        }
        return (dep[T]!=-1);
    }
    int dfs(int st,int limit){
        if(st==T)return limit;
        for(int i=cur[st];i<e[st].size();++i)
        {//当自己退出dfs后再进来就可以直接从cur[st]开始
            cur[st]=i;//当前弧优化
            int to=e[st][i].to;
            if(dep[to]==dep[st]+1&&e[st][i].cap){
                int t=dfs(to,min(e[st][i].cap,limit));
                if(t){
                    e[st][i].cap-=t;
                    e[to][e[st][i].rev].cap+=t;
                    return t;
                }
                else dep[to]=-1;
            }
        }
        return 0;
    }
    int dinic(){//源点S,汇点T
        int mflow=0,flow;
        while((bfs())){
            while(flow=dfs(S,INF))mflow+=flow;
        }
        return mflow;//返回值=最大流=最小割(割的对象是边不是点)
    }
};
```

### 可持久化线段树（主席树？）

```cpp
//用来解决q次询问的区间的第k小值
#include<bits/stdc++.h>
using namespace std;
#define ll long long
#define pi pair<int,int>
#define pn printf("\n")

void print(ll x){
    if(x<0){putchar('-');x=-x;}
    if(x>9)print(x/10);
    putchar(x%10+'0');
}
ll read(){
    ll x=0,f=1;char ch=getchar();
    while(ch<'0'||ch>'9'){if(ch=='-')f=-1;ch=getchar();}
    while(ch>='0'&&ch<='9'){x=(x<<1)+(x<<3)+(ch^48);ch=getchar();}
    return x*f;
}
const int mod=1e9+7; 
const int N=1e5+5;
// const int N=15;

struct node{
    int vis;
    int l,r;
}t[N<<5];
int to[N];//记录下标为i的位置指向哪个node
int tot;
int a[N],b[N],c[N];//第i位是谁,第i名是第b[i]位,第i位是第c[i]名
void up(int id){
    t[id].vis=t[t[id].l].vis+t[t[id].r].vis;
}
void build(int l,int r,int x,int id,int lsid){
    if(l==r){
        ++t[id].vis;
        return;
    }
    int mid=(l+r)>>1;
    if(x>mid){
        t[id].l=t[lsid].l;
        t[id].r=++tot;
        build(mid+1,r,x,t[id].r,t[lsid].r);
    }
    else{
        t[id].r=t[lsid].r;
        t[id].l=++tot;
        build(l,mid,x,t[id].l,t[lsid].l);
    }
    up(id);
}
int query(int l,int r,int lid,int rid,int k){
    int mid=(l+r)>>1;
    int tk=t[t[rid].l].vis-t[t[lid].l].vis;
    if(l==r)return l;
    if(k>tk){
        return query(mid+1,r,t[lid].r,t[rid].r,k-tk);
    }
    else{
        return query(l,mid,t[lid].l,t[rid].l,k);
    }
}
void solve(){
    int n=read(),m=read();
    for(int i=1;i<=n;++i){
        a[i]=read();b[i]=i;
    }
    sort(b+1,b+n+1,[&](int& x,int& y){return a[x]<a[y];});
    for(int i=1;i<=n;++i)c[b[i]]=i;
    for(int i=1;i<=n;++i){
        to[i]=++tot;
        build(1,n,c[i],to[i],to[i-1]);
    }
    for(int i=1;i<=m;++i){//m次询问的解决过程
        int x=read(),y=read();
        int k=(y-x+2)/2;
        int tem=query(1,n,to[x-1],to[y],k);
        cout<<a[b[tem]];pn;
    }
}
int main()
{
    int t=1;
    while(t--){
        solve();
    }
    return 0;
}
```

### 素数筛-欧拉筛

```cpp
int vis[N];//vis用来判断数字是否访问过
int prime[N];//prime用来存储筛选出来的素数
int sieve(int n){
    int k=0;
    vis[0]=vis[1]=1;
    for(int i=2;i<=n;++i){
        if(!vis[i])vis[i]=prime[++k]=i;
        for(int j=1;j<=k&&i*prime[j]<=n;++j){
            vis[i*prime[j]]=1;
            if(i%prime[j]==0)break;
        }
    }
    return k;
}
// 变式：记录数的质因数奇偶性
if(!vis[i]){prime[++k]=i;hv[i]=mrand();}
for(int j=1;j<=k&&i*prime[j]<=n;++j){
    vis[i*prime[j]]=1;
    hv[i*prime[j]]=hv[i]^hv[prime[j]];// hv记录质因数奇偶性
    if(i%prime[j]==0)break;
}
```

### NTT、fft(快速傅里叶变换)

给定数组 $f$、$g$

可得 $z_k = \sum_{i=0}^{k}f[i]*g[k-i]$

```cpp
namespace poly{// NTT
    const int mod=998244353,gen=3;
    const int logN=25;
    static int g[logN][N],iv[N];
    inline int power(int u,int v){
        int res=1;
        while(v){if(v&1)res=res*u%mod;v>>=1;u=u*u%mod;}
        return res;
    }
    inline void init(){
        for(int i=1;i<logN;++i){
            g[i][0]=1,g[i][1]=power(gen,(mod-1)>>i);
            for(int j=2;j<=N;++j)g[i][j]=(ll)g[i][j-1]*g[i][1]%mod;
        }
    }
    static int rev[N];
    inline int ad(int u,int v){return(u+=v)>=mod?u-mod:u;}
    inline void calrev(int len){
        for(int i=1;i<len;++i){
            rev[i]=rev[i>>1]>>1;
            if(i&1)rev[i]|=len>>1;
        }
    }
    inline void NTT(int*F,int len,int typ){// typ = 1: DFT ;typ = -1 :IDFT
        calrev(len);
        for(int i=1;i<len;++i)if(i<rev[i])swap(F[i],F[rev[i]]);
        for(int i=2,ii=1,t=1;i<=len;i<<=1,ii<<=1,++t)
            for(int j=0;j<len;j+=i)for(int k=0;k<ii;++k){
                int tt=(ll)F[j+k+ii]*g[t][k]%mod;
                F[j+k+ii]=ad(F[j+k],mod-tt);
                F[j+k]=ad(F[j+k],tt);
            }
        if(typ==-1){
            reverse(F+1,F+len);
            ll invn=power(len,mod-2);
            for(int i=0;i<len;++i)F[i]=invn*F[i]%mod;
        }
    }
}
using poly::NTT;

poly::init();// 初始化

```

oi-wiki无模：

```cpp
#include <cmath>
#include <cstring>
#include <iostream>
const double PI = acos(-1.0);
struct Complex {
    double x, y;
    Complex(double _x = 0.0, double _y = 0.0) {
        x = _x;y = _y;
    }
    Complex operator-(const Complex &b) const {
        return Complex(x - b.x, y - b.y);
    }
    Complex operator+(const Complex &b) const {
        return Complex(x + b.x, y + b.y);
    }
    Complex operator*(const Complex &b) const {
        return Complex(x * b.x - y * b.y, x * b.y + y * b.x);
    }
};
// len 必须为 2 的幂
void change(Complex y[], int len) {
    int i, j, k;
    for (int i = 1, j = len / 2; i < len - 1; i++) {
        if (i < j) std::swap(y[i], y[j]);
        k = len / 2;
        while (j >= k) {
            j = j - k;k = k / 2;
        }
        if (j < k) j += k;
    }
}
void fft(Complex y[], int len, int on) {
    change(y, len);
    for (int h = 2; h <= len; h <<= 1) {             // 模拟合并过程
        Complex wn(cos(2 * PI / h), sin(2 * PI / h));  // 计算当前单位复根
        for (int j = 0; j < len; j += h) {
        Complex w(1, 0);  // 计算当前单位复根
        for (int k = j; k < j + h / 2; k++) {
            Complex u = y[k];
            Complex t = w * y[k + h / 2];
            y[k] = u + t;  // 这就是把两部分分治的结果加起来
            y[k + h / 2] = u - t;
            w = w * wn;
            }
        }
    }
    if (on == -1) {
        reverse(y + 1, y + len);
        for (int i = 0; i < len; i++) {
            y[i].x /= len;
            y[i].y /= len;
        }
    }
}

```

### 环染色问题
给定一个环，一个圆环被分成 n>=2 块，用 m>=2 种不同颜色给每一块染色，要求相邻两块的颜色不相同。此类问题称之为环形染色问题。
环形染色问题的解法是：先把环切开成一条线段，得到线段染色问题的解法，然后再根据线段染色问题的解法来求解环形染色问题。
$$
a_n+a_{n-1}=m*(m-1)^{n-1}
a_n=(m-1)^n+(-1)^n*(m-1)
$$
以上公式适用于 n>=2, m>=2 的情况，且 a_n 是环形染色问题的解法，a_{n-1} 是线段染色问题的解法。


### 其它
```
动态规划中，对于状态
dp[i][j][k]=deal(dp[i-1][_j][_k])(_j<=j,_k<=k) (deal 代表需要某种操作，如取最大值最小值)
压状（去掉i维）时，由于 _j<=j,_k<=k，j维、k维需要倒序遍历，如
for (int i = 0; i <= n; ++i){
	for (int j = m; j >= 0; --j)
		for (k = len; k >= 0; --k){
			dp[j][k]=deal(dp[_j][_k]) // 这里 i 维被去掉
		}
}
且需要考虑特殊情况：
j==_j && k==_k 时要特殊处理
例：[F-小苯的糖果盒_牛客周赛 Round 137](https://ac.nowcoder.com/acm/contest/130843/F)


然而，于其压状，不如
vector dp2(N*N+9, vector<int>(N+9, INF));
for (int j = 0; j <= m; j++) {
	for (int k = 0; k <= len; k++) {
		dp2[j][k] = deal(dp[_j][_k]);
	}
}
swap(dp,dp2);
```


