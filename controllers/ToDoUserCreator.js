
    const salt = bcrypt.genSaltSync(10)
    const hashedPass = bcrypt.hashSync("test12345",salt)

    await Users.create({
        username:"mattleandri",
        password:hashedPass
    })
