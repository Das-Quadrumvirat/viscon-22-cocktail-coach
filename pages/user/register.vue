<template>
    <form method="POST" action="/api/user/register" class="form-control" >
        <label class="label">
            <span class="label-text">Your username</span>
        </label>
        <label class="input-group">
            <span>username</span>
            <input type="text" placeholder="usermaker" class="input input-bordered" name="username" id="username">
        </label>
        <label class="label">
            <span class="label-text">Your password</span>
        </label>
        <label class="input-group">
            <span>username</span>
            <input type="password" placeholder="mysecretpassword" class="input input-bordered" name="password" id="password">
        </label>
        <input type="submit" class="btn btn-wide">
    </form>
</template>
