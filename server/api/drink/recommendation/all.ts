export default defineEventHandler(async () =>  {
    const second_promise = $fetch("/api/drink/recommendation/second")
    const day_promise = $fetch("/api/drink/recommendation/week") 
    const week_promise = $fetch("/api/drink/recommendation/week")
    const month_promise = $fetch("/api/drink/recommendation/month")
    const [second, day, week, month] = await Promise.all([second_promise, day_promise, week_promise, month_promise])
    return {
        second,
        day,
        week,
        month
    }
})