<template>
    <div class="m-8">
        <div class="shadow bg-slate-700 mt-5 mb-5 p-5 rounded-md">
            <div class="navbar">
                <button @click="back" class="btn btn-ghost">
                    <font-awesome-icon icon="fa-solid fa-arrow-left" />
                </button>
            </div>
            <h1 class="text-4xl m-5">Cocktail App</h1>
            <h2 class="text-2xl ml-2 mt-3 mb-3">Overengineered with ❤️ by:</h2>
            <ul class="list-inside ml-2 list-disc text-xl">
                <li><a href="https://github.com/tectrixer" class="link link-hover">Constantin</a></li>
                <li><a href="https://github.com/Zollerboy1" class="link link-hover">Josef</a></li>
                <li><a href="https://github.com/vypxl" class="link link-hover">Thomas</a></li>
                <li><a href="https://github.com/umgefahren" class="link link-hover">Hannes</a></li>
            </ul>
        </div>
        <div class="shadow bg-slate-700 mt-5 mb-5 p-5 rounded-md">
            <h1 class="text-3xl m-5">Time</h1>
            <div class="stats stats-vertical lg:stats-horizontal shadow">
                <div class="stat">
                    <div class="stat-title">Second</div>
                    <div class="stat-value">{{ time.second }}</div>
                </div>

                <div class="stat">
                    <div class="stat-title">Minute</div>
                    <div class="stat-value">{{ time.minute }}</div>
                </div>

                <div class="stat">
                    <div class="stat-title">Hour</div>
                    <div class="stat-value">{{ time.hour }}</div>
                </div>

                <div class="stat">
                    <div class="stat-title">Day</div>
                    <div class="stat-value">{{ time.day }}</div>
                </div>

                <div class="stat">
                    <div class="stat-title">Month</div>
                    <div class="stat-value">{{ time.month }}</div>
                </div>

                <div class="stat">
                    <div class="stat-title">Year</div>
                    <div class="stat-value">{{ time.year }}</div>
                </div>
            </div>
        </div>
        <div class="shadow bg-slate-700 mt-5 mb-5 p-5 rounded-md">
            <h1 class="text-3xl m-5">Os</h1>
            <div class="stats stats-vertical lg:stats-horizontal shadow">
                <div class="stat">
                    <div class="stat-title">Platform</div>
                    <div class="stat-value">{{ os.platform }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">Distro</div>
                    <div class="stat-value">{{ os.distro }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">Release</div>
                    <div class="stat-value">{{ os.release }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">Kernel</div>
                    <div class="stat-value">{{ os.kernel }}</div>
                </div>
                <div class="stat">
                    <div class="stat-title">Arch</div>
                    <div class="stat-value">{{ os.arch }}</div>
                </div>
            </div>
        </div>
        <div class="shadow bg-slate-700 mt-5 mb-5 p-5 rounded-md">
            <h1 class="text-3xl m-5">Load</h1>
            <div class="stats stats-vertical lg:stats-horizontal shadow">
                <div class="stat">
                    <div class="stat-title">Average Load</div>
                    <div class="stat-value">{{ load.avgLoad }}%</div>
                </div>
                <div class="stat">
                    <div class="stat-title">Current Load</div>
                    <div class="stat-value">{{ floorPrecised(load.currentLoad, 2) }}%</div>
                </div>
            </div>
            <div class="shadow mt-5 mb-5 p-5 bg-slate-900 rounded-xl">
                <div class="radial-progress" :style="`--value:${cpu}`" v-for="cpu in load.cpus">{{ floorPrecised(cpu,
                2)}}%</div>
            </div>
        </div>
        <div class="shadow bg-slate-700 mt-5 mb-5 p-5 rounded-md">
            <h1 class="text-3xl m-5">Memory</h1>
            <div class="stat">
                <div class="stat-title">Total Memory</div>
                <div class="stat-value">{{ floorPrecised(memory.total / 1e+9, 2) }} GB</div>
                <div class="stat-title">Used Memory</div>
                <div class="stat-value">{{ floorPrecised(memory.used / 1e+9, 2) }} GB</div>
            </div>
        </div>
        <div class="shadow bg-slate-700 mt-5 mb-5 p-5 rounded-md">
            <h1 class="text-3xl m-5">CPU</h1>
            <div class="stat">
                <div class="stat-title">Manufacturer</div>
                <div class="stat-value">{{ cpu.manufacturer }}</div>
            </div>
            <div class="stat">
                <div class="stat-title">Brand</div>
                <div class="stat-value">{{ cpu.brand }}</div>
            </div>
            <div class="stat">
                <div class="stat-title">Speed</div>
                <div class="stat-value">{{ cpu.speed }} GHz</div>
            </div>
            <div class="stat">
                <div class="stat-title">Speed Min</div>
                <div class="stat-value">{{ cpu.speedMin }} GHz</div>
            </div>
            <div class="stat">
                <div class="stat-title">Speed Max</div>
                <div class="stat-value">{{ cpu.speedMax }} GHz</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
function floorPrecised(number: number, precision: number): number {
    var power = Math.pow(10, precision);

    return Math.floor(number * power) / power;
}

const { data: { value } } = await useFetch("/api/info")


const { time, os, load, memory, cpu } = value

</script>

<script lang="ts">
export default {
    methods: {
        back(event) {
            const router = useRouter()
            router.back()
        }
    }
}
</script>