const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Username = require('./models/users')
const Subgreddiit = require('./models/subs')
const Post = require('./models/posts')
const Saved = require('./models/saved')
const Report = require('./models/reports')
const cors = require('cors');
const Follower_list = require('./models/followers');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const dbURI = 'mongodb+srv://Shambhavi28:5%40Monkeys@cluster0.cahqmbo.mongodb.net/Db1?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("connected to db"))
    .catch((err) => console.log('Error connecting to database', err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors())
app.use(router)
app.use(express.json());

app.listen(5000);

router.post('/new-user', (req, res) => {
    console.log('hi')

    const {
        uname,
        pwd,
        email,
        fname,
        lname,
        contact,
        age
    } = req.body;

    const saved = new Saved({
        uname: uname
    })

    saved.save()

    const followers = new Follower_list({
        uname: uname
    })

    followers.save()

    console.log(req.body)
    const new_user = new Username({
        uname: uname,
        pwd: pwd,
        email: email,
        fname: fname,
        lname: lname,
        contact: contact,
        age: age
    })

    new_user.save()
        .then((result) => {
            console.log(result);
            console.log('hihi')
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })

})

router.post('/login', (req, res) => {
    console.log('checking login credentials');
    console.log(req.body);
    Username.findOne({ uname: req.body.username })
        .then((found) => {
            if (found === null) {
                res.send({ ret: 0 });
                console.log('returning not found');
            }
            else {
                console.log('This is what i found : ', found.uname, found.pwd);
                console.log('This is what i want: ', req.body.username, req.body.password);
                // bcrypt.compareSync(req.body.password, found.pwd)
                if (bcrypt.compare(req.body.password, found.pwd)) {
                    console.log("RETURNING HERE: 1")
                    res.send(found);
                }
                else {
                    console.log(req.body.password, found.pwd)
                    res.send({ ret: 0 });
                    console.log('returning wrong password');
                }
            }
        })
        .catch((err) => {
            console.log('Error finding Login');
            console.log(err);
        })
})

router.post('/new-sub', (req, res) => {
    console.log('New subgreddiit details');
    console.log('new-sub-data:')
    console.log(req.body);

    const new_sub_data = new Subgreddiit({
        moderator: req.body.moderator,
        sub_name: req.body.sub_name,
        sub_desc: req.body.sub_desc,
        sub_banned: req.body.sub_banned,
        followers: req.body.followers
    })

    new_sub_data.save()
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((err) => {
            console.log('Error in backend');
            console.log(err);
        })
})

router.post('/get-my-subs', (req, res) => {
    console.log('getting my sub details');
    console.log(req.body);
    Subgreddiit.find({ moderator: req.body.moderator })
        .then((found) => {
            console.log('I found this: ');
            console.log(found);
            res.send(found);
        })
        .catch((err) => {
            console.log('Error finding my subs');
            console.log(err);
        })
})

router.post('/get-profile-data', (req, res) => {
    console.log('getting profile details');
    Username.findOne({ uname: req.body.username })
        .then((found) => {
            res.send(found);
        })
        .catch((err) => {
            console.log('Error finding Profile');
            console.log(err);
        })
})

router.post('/get-all-subs', (req, res) => {
    const regex = new RegExp(`.*${req.body.search_by}.*`, "i");
    console.log('getting all sub details');
    console.log(req.body);
    Subgreddiit.find({ sub_name: regex })
        .then((found) => {
            console.log(found);
            res.send(found);
        })
        .catch((err) => {
            console.log('Error finding my subs');
            console.log(err);
        })
})

router.post('/subpage', (req, res) => {
    console.log('Getting details for the subpage')
    console.log(req.body);
    Subgreddiit.findOne({ sub_name: req.body.sub_name })
        .then((found) => {
            console.log('Getting subgreddiit details')
            // console.log(res);
            res.send(found);
        })
        .catch((err) => {
            console.log('Error subgreddiit mei')
            console.log(err);
        })
})

router.post('/new-post', async (req, res) => {
    console.log('new-post-data:')
    console.log(req.body);

    const new_post_data = new Post({
        posted_by: req.body.posted_by,
        sub_name: req.body.sub_name,
        text: req.body.post,
        true_posted_by: req.body.true_posted_by
    })

    const u1 = await new_post_data.save()

    const u2 = await Subgreddiit.updateOne(
        {sub_name: req.body.sub_name},
        {$inc: {n_posts:1}}
    )

    try{
        res.send({u1})
    }
    catch(err){
        console.log(err)
    }
        // .then((response) => {
        //     console.log(response);
        //     res.send(response);
        // })
        // .catch((err) => {
        //     console.log('Error in backend');
        //     console.log(err);
        // })

})

router.post('/sub-posts', (req, res) => {
    console.log('Getting posts for the subpage');
    console.log(req.body);
    Post.find({ sub_name: req.body.sub_name })
        .then((found) => {
            console.log('Found posts:');
            console.log(req.body.sub_name);
            // console.log(found);
            res.send(found);
        })
        .catch((err) => {
            console.log('Error getting posts for the subpage');
            console.log(err);
        })
})

router.post('/upvote', (req, res) => {

    Post.updateOne(
        { _id: req.body.id },
        { $inc: { upvotes: 1 } }
    )
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/downvote', (req, res) => {

    Post.updateOne(
        { _id: req.body.id },
        { $inc: { downvotes: 1 } }
    )
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/request-join', (req, res) => {
    console.log('Requesting to Join');
    console.log(req.body.sub_name)

    Subgreddiit.updateOne(
        { sub_name: req.body.sub_name },
        { $push: { requests: req.body.uname } }
    )
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/accept-request', async (req, res) => {
    console.log('Accepting request');
    const u1 = await Subgreddiit.updateOne(
        { sub_name: req.body.sub_name },
        { $push: { followers: req.body.uname } },
    )

    const u2 = await Subgreddiit.updateOne(
        { sub_name: req.body.sub_name },
        { $pull: { requests: req.body.uname } }
    )

    try {
        console.log(u1);
        console.log(u2);
        res.send({ u1, u2 })
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/reject-request', (req, res) => {
    console.log('Rejecting request');
    Subgreddiit.updateOne(
        { sub_name: req.body.sub_name },
        { $pull: { requests: req.body.uname } },
    )
        .then((response) => {
            console.log(response);
            res.send()
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/saved-lao', (req, res) => {
    console.log('Getting saved posts');
    console.log(req.body)
    Saved.findOne({ uname: req.body.uname })
        .then((response) => {
            // console.log(response.ids);
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/save-this', (req, res) => {
    console.log('Saving post');
    console.log(req.body.post);
    Saved.updateOne(
        { uname: req.body.uname },
        { $push: { ids: req.body.post } }
    )
        .then((response) => {
            // console.log(res);
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/follow', async (req, res) => {
    const u1 = await Follower_list.findOneAndUpdate(
        { uname: req.body.follower },
        { $push: { following: req.body.following } }
    )

    const u2 = await Follower_list.findOneAndUpdate(
        { uname: req.body.following },
        { $push: { followers: req.body.follower } }
    )
    try {
        console.log(u1)
        console.log(u2)
        res.send({ u1, u2 })
    }
    catch (err) {
        console.log(err)
    }
})

router.post('/get-followers', (req, res) => {
    Follower_list.findOne({ uname: req.body.uname })
        .then((found) => {
            console.log(found);
            res.send(found);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/get-post', (req, res) => {
    Post.findOne({ _id: req.body.id })
        .then((found) => {
            console.log(found);
            res.send(found);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/remove-follower', (req, res) => {
    Follower_list.updateOne(
        { uname: req.body.follower },
        { $pull: { following: req.body.following } }
    )
        .then((response) => {
            console.log('Step 1')
            console.log(response);
        })

    Follower_list.updateOne(
        { uname: req.body.following },
        { $pull: { followers: req.body.follower } }
    )
        .then((response) => {
            console.log('Step 2')
            console.log(response);
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/remove-saved-post', (req, res) => {
    Saved.updateOne(
        { uname: req.body.uname },
        { $pull: { ids: req.body.post } }
    )
        .then((response) => {
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/report-post', (req, res) => {
    const new_report = new Report({
        sub_name: req.body.sub_name,
        reported_by: req.body.reported_by,
        reported_user: req.body.reported_user,
        concern: req.body.concern,
        post_text: req.body.post_text,
        post_id: req.body.post_id
    })

    new_report.save()
        .then((response) => {
            console.log(response);
            res.send(response);
        })
        .catch((err) => {
            console.log('Error in saving report');
            console.log(err);
        })
})

router.post('/get-reports', (req, res) => {
    Report.find({ sub_name: req.body.sub_name })
        .then((found) => {
            console.log(found);
            res.send(found);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/remove-post', async (req, res) => {
    console.log('see this')
    console.log(req.body)
    const u1 = await Post.deleteOne({ text: req.body.text.post })

    const u2 = await Report.deleteOne({ post_text: req.body.text.post })
    try {
        console.log('DELETING REPORT')
        console.log(u1);
        console.log(u2);
        res.send({ u1, u2 });
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/get-comments', (req, res) => {
    console.log('getting comments')
    console.log(req.body)

    Post.findOne({ _id: req.body.post })
        .then((found) => {
            console.log('Found Comments: ')
            console.log(found.comments);
            res.send(found.comments);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/add-comment', (req, res) => {
    console.log('adding this comment');
    console.log(req.body.comment);
    Post.updateOne(
        { _id: req.body.post },
        { $push: { comments: req.body.comment } }
    )
        .then((response) => {
            console.log('added comment');
            res.send(response);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/edit-report', async (req, res) => {
    console.log('editing report');
    console.log(req);
    const u1 = await Report.updateOne(
        { _id: req.body.id },
        { blocked: req.body.blocked }
    )

    const u2 = await Report.updateOne(
        { _id: req.body.id },
        { ignored: req.body.ignored }
    )

    const u3 = await Post.updateOne(
        { _id: req.body.post_id },
        { posted_by: "Blocked User" }
    )

    try {
        res.send({ u1, u2, u3 });
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/get-users-list', (req, res) => {
    Subgreddiit.findOne({ _id: req.body.sub_id })
        .then((found) => {
            console.log('users found');
            console.log(found);
            res.send(found.followers)
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/edit-user-profile', async (req, res) => {
    console.log('editing profile');
    console.log(req.body);
    const u1 = await Username.updateOne(
        { uname: req.body.uname },
        { email: req.body.email }
    )

    const u2 = await Username.updateOne(
        { uname: req.body.uname },
        { fname: req.body.fname }
    )

    const u3 = await Username.updateOne(
        { uname: req.body.uname },
        { lname: req.body.lname }
    )

    const u4 = await Username.updateOne(
        { uname: req.body.uname },
        { contact: req.body.contact }
    )

    const u5 = await Username.updateOne(
        { uname: req.body.uname },
        { age: req.body.age }
    )

    try {
        res.send({ u1, u2, u3, u4, u5 });
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/delete-sub', async (req, res) => {
    console.log('deleting subgreddiit');
    console.log(req.body);

    const u1 = await Subgreddiit.deleteOne({ _id: req.body.sub_id })

    const u2 = await Post.deleteMany({ sub_name: req.body.sub_name })

    const u3 = await Report.deleteMany({ sub_name: req.body.sub_name })

    // const u4 = await Saved.updateMany(
    //     {
    //         ids: {
    //             $map: {
    //                 sub_name: req.body.sub_name
    //             }
    //         }
    //     },
    //     {
    //         ids: { $pull: { sub_name: req.body.sub_name } }
    //     }
    // )

    // const u4 = await Saved.updateMany({},
    //     {
    //         $pull: {
    //             "ids": {
    //                 $map: {
    //                     sub_name: req.body.sub_name
    //                 }
    //             }
    //         }
    //     }
    // )

    try {
        res.send({ u1, u2, u3 });
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/sub-posts-per-day', (req, res)=> {

    Post.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                count: { $sum: 1 }
            }
        }
    ]).toArray((err, result) => {
        console.log(result);
    });
})