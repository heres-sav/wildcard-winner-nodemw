const processTable = (
  table,
  categories
) => {
  // Outline Mapping
  let outlineMap = {}
  categories.forEach(each => {
    outlineMap = {...outlineMap, ...each.items}
  })
  // Process order details
  const { orders } = table
  const processed = {}
  const items = {}
  const summary = {
    total: 0,
    discount: 0,
    billingAmount: 0
  }
  Object.keys(orders).forEach(stamp => {
    Object.keys(orders[stamp].items).forEach(itemIndex => {
      if(!items[itemIndex]) {
        items[itemIndex] = {
          name: orders[stamp].items[itemIndex].name,
          count: orders[stamp].items[itemIndex].count,
          unit: outlineMap[itemIndex].sellingCost,
          price: orders[stamp].items[itemIndex].count * outlineMap[itemIndex].sellingCost
        }
        summary.total = orders[stamp].items[itemIndex].count * outlineMap[itemIndex].sellingCost
      }
      else {
        items[itemIndex].count += orders[stamp].items[itemIndex].count
        items[itemIndex].price += orders[stamp].items[itemIndex].count * outlineMap[itemIndex].sellingCost
        summary.total += orders[stamp].items[itemIndex].count * outlineMap[itemIndex].sellingCost
      }
    })
  })
  // Get discounted price
  summary.billingAmount = Number(summary.total) * (100 - Number(summary.discount))/100

  processed.items = items
  processed.summary = summary
  return processed
}

module.exports = {
  processTable
}