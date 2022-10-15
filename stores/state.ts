import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useStore = defineStore('state', () => {
    const selected_ingredients = useStorage('selected_ingredients', [])

    const isIngredientSelected = computed(() => slug => selected_ingredients.value.includes(slug))
    const selectedIngredients = computed(() => selected_ingredients.value)

    function selectIngredient(slug) {
        if (!selected_ingredients.value.includes(slug)) selected_ingredients.value.push(slug)
    }
    
    function deselectIngredient(slug) {
        selected_ingredients.value = selected_ingredients.value.filter(x => x != slug)
    }
    
    function toggleIngredientSelected(slug) {
        if (selectedIngredients.value.includes(slug)) deselectIngredient(slug)
        else selectIngredient(slug)
    }
    
    return { isIngredientSelected, selectedIngredients, selectIngredient, deselectIngredient, toggleIngredientSelected }
})
