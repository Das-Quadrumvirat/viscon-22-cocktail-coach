import { cpu, currentLoad, mem, osInfo } from "systeminformation"

export type TimeInformation = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    millis: number,
}

export type OsInfo = {
    platform: string,
    distro: string,
    release: string,
    kernel: string,
    arch: string,
}

export type Load = {
    avgLoad: number,
    currentLoad: number,
    cpus: number[]
}

export type Memory = {
    total: number,
    free: number,
    used: number,
}

export type Cpu = {
    manufacturer: string,
    brand: string,
    speed: number,
    speedMin: number,
    speedMax: number,
    cores: number,
    physicalCores: number,
}

function getTimeInformation(): TimeInformation {
    const now = new Date()
    return {
        year: now.getUTCFullYear(),
        month: now.getUTCMonth(),
        day: now.getUTCDate(),
        hour: now.getUTCHours(),
        minute: now.getUTCMinutes(),
        second: now.getUTCSeconds(),
        millis: now.getUTCMilliseconds()
    }
}

async function getOsInfo(): Promise<OsInfo> {
    const os_info = await osInfo()
    return {
        platform: os_info.platform,
        distro: os_info.distro,
        release: os_info.release,
        kernel: os_info.kernel,
        arch: os_info.arch        
    }
}

async function getLoad(): Promise<Load> {
    const load_info = await currentLoad()
    return {
        avgLoad: load_info.avgLoad,
        currentLoad: load_info.currentLoad,
        cpus: load_info.cpus.map((c) => c.load)
    } 
}

async function getMemory(): Promise<Memory> {
    const memory = await mem()
    return {
        total: memory.total,
        free: memory.free,
        used: memory.used
    }
}

async function getCpu(): Promise<Cpu> {
    const c = await cpu()
    return {
        manufacturer: c.manufacturer,
        brand: c.brand,
        speed: c.speed,
        speedMin: c.speedMin,
        speedMax: c.speedMax,
        cores: c.cores,
        physicalCores: c.physicalCores
    }
}

export type SystemInformation = {
    time: TimeInformation,
    os: OsInfo,
    load: Load,
    memory: Memory,
    cpu: Cpu
}

export default defineEventHandler(async () => {
    const [os, load, memory, cpu] = await Promise.all([getOsInfo(), getLoad(), getMemory(), getCpu()])
    const time = getTimeInformation()
    const ret: SystemInformation = {
        time,
        os,
        load,
        memory,
        cpu
    }
    return ret
})