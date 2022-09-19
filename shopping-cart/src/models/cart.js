const cart = {
    namespace: 'cart',
    state: {
        checks: [],
        sum: 0
    },
    reducers: {
        checks ({ checks }, { data }) {
            return {
                checks,
                checks: data
            }
        },
        // 添加
        add ({ checks }, { check }) {
            if (Object.is(check.type, 'loc')) {
                return {
                    checks:check.checks
                }
            }else if (checks.length) {
                let newKey = checks.findIndex(i => i.id === check.id)
                if (newKey === -1) {
                    check['num'] = 1
                    checks.push(check)
                } else {
                    checks[newKey]['num']++
                }
                return {checks:checks }
            } else {
                check['num'] = 1
                return {
                    checks:[check]
                }
            }
            
        },
        // 删除
        del ({checks},{data}) {
            let index = checks.findIndex(i => i.id === data.item.id)
                if (data.type === 'all') {
                    let newArr = checks.filter(v => v.id !== data.item.id)
                    return {
                        checks: newArr
                    }
                }
                if (data.type === 'delNum') {
                    checks[index].num--
                    return {
                        checks:checks
                    }
                }
                if (data.type === 'addNum') {
                    checks[index].num++
                    return {
                        checks:checks
                    }
                }
        }
    },
}
export default cart