<template>
   <div>
         <div class="absolute top-0 navbar mb-8 px-8 py-5 z-50">
             <button @click="back" class="btn btn-ghost">
                 <font-awesome-icon icon="fa-solid fa-arrow-left" />
             </button>
         </div>
     </div>
  <div class="w-full justify-evenly h-full items-start flex-wrap md:flex-nowrap flex my-6 p-10 flex-row">
    <div class="flex mb-10 ml-5 flex-col text-justify">
      <h2 class="text-4xl mx-auto">{{ing.name}}</h2>
      <div class="mt-5 mb-8 mx-auto">
        <div class="badge badge-error select-none" v-if="ing.alcohol">Alcoholic: {{ing.ABV}}%</div>
        <div class="badge badge-success select-none" v-else>Non-Alcoholic</div>
        <div class="badge ml-3 select-none" v-if="ing.ingredientType">{{ing.ingredientType}}</div>
      </div>
      <p v-if="ing.description" class="text-lg">{{ing.description}}</p>
      <p v-else class="text-lg">No description available</p>
    </div>
    <img class="max-w-md object-contain mt-0 md:mt-32" :src="'https://thecocktaildb.com/images/ingredients/' + encodeURI(ing.name) + '.png'"/>
  </div>
</template>

<script>
    export default {
        name: "ingredient",
        props: ["ing"],
      methods: {
         back(event) {
             const router = useRouter()
             router.back()
         },
     }
    }
</script>
