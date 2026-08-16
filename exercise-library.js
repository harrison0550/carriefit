(function (root) {
  const wgerLicense = Object.freeze({
    shortName: "CC-BY-SA 4.0",
    fullName: "Creative Commons Attribution-ShareAlike 4.0",
    url: "https://creativecommons.org/licenses/by-sa/4.0/"
  });

  const ritfit = ({
    sourceExercise,
    sourceDocument,
    media,
    mediaAlt,
    primaryMuscles,
    secondaryMuscles = [],
    equipment,
    commonMistakes
  }) => ({
    sourceType: "official-manual",
    provider: "RitFit",
    providerUrl: "https://www.ritfitsports.com/",
    sourceExercise,
    sourceDocument,
    author: "RitFit",
    media: `assets/exercise-library/ritfit/${media}`,
    mediaAlt,
    primaryMuscles,
    secondaryMuscles,
    equipment,
    commonMistakes,
    rightsNote: "Official equipment poster supplied by the user for this personal, private training app."
  });

  const carriefitIllustration = ({
    sourceExercise,
    media,
    mediaCollection = "original",
    mediaAlt,
    primaryMuscles,
    secondaryMuscles = [],
    equipment,
    commonMistakes
  }) => ({
    sourceType: "app-original",
    provider: "CarrieFit",
    sourceExercise,
    author: "CarrieFit",
    media: `assets/exercise-library/${mediaCollection}/${media}`,
    mediaAlt,
    primaryMuscles,
    secondaryMuscles,
    equipment,
    commonMistakes,
    rightsNote: "App-created instructional illustration. Written setup and movement cues remain the authoritative coaching guide."
  });

  const entries = {
    "Dead Bug": carriefitIllustration({
      sourceExercise: "Alternating dead bug",
      mediaCollection: "generated",
      media: "dead-bug-female.gif",
      mediaAlt: "Looping female demonstration of a controlled dead bug, alternating one arm and the opposite leg while keeping the lower back supported",
      primaryMuscles: ["Deep core"],
      secondaryMuscles: ["Hip flexors", "Shoulders"],
      equipment: ["Exercise mat or comfortable floor space"],
      commonMistakes: ["Arching the lower back", "Moving the same-side arm and leg", "Extending farther than can be controlled", "Holding the breath"]
    }),
    "Bird Dog": carriefitIllustration({
      sourceExercise: "Alternating bird dog",
      mediaCollection: "generated",
      media: "bird-dog-female.gif",
      mediaAlt: "Looping female demonstration of a bird dog, alternating the left arm with right leg and the right arm with left leg while keeping the torso level",
      primaryMuscles: ["Deep core", "Glutes"],
      secondaryMuscles: ["Shoulders", "Upper back"],
      equipment: ["Exercise mat or comfortable floor space"],
      commonMistakes: ["Lifting the arm or leg too high", "Rotating the hips", "Arching the lower back", "Moving too quickly"]
    }),
    "Side Plank from Knees": carriefitIllustration({
      sourceExercise: "Modified side plank from knees",
      mediaCollection: "generated",
      media: "side-plank-from-knees-female.gif",
      mediaAlt: "Looping female demonstration of a modified side plank lifting the hips from bent knees into a straight shoulder-to-knee line",
      primaryMuscles: ["Obliques", "Deep core"],
      secondaryMuscles: ["Glutes", "Shoulders"],
      equipment: ["Exercise mat or comfortable floor space"],
      commonMistakes: ["Letting the shoulder shrug", "Rolling the top hip backward", "Dropping the hips", "Holding after form breaks down"]
    }),
    "Hip and Glute Mobility": carriefitIllustration({
      sourceExercise: "Seated figure-four hip stretch",
      mediaCollection: "generated",
      media: "hip-glute-mobility-female.gif",
      mediaAlt: "Looping female demonstration of a seated figure-four hip and glute stretch with a controlled forward hinge",
      primaryMuscles: ["Glutes", "Outer hips"],
      secondaryMuscles: ["Lower back"],
      equipment: ["Stable bench or chair"],
      commonMistakes: ["Rounding the back", "Forcing the raised knee downward", "Letting the crossed foot relax", "Bouncing into the stretch"]
    }),
    "Thoracic and Shoulder Mobility": carriefitIllustration({
      sourceExercise: "Supported wall slide",
      mediaCollection: "generated",
      media: "chest-shoulder-mobility.gif",
      mediaAlt: "Looping female wall-slide demonstration raising and lowering both arms while keeping the ribs controlled",
      primaryMuscles: ["Shoulders", "Upper back"],
      secondaryMuscles: ["Chest"],
      equipment: ["Clear wall space"],
      commonMistakes: ["Flaring the ribs", "Shrugging the shoulders", "Forcing the hands against the wall", "Moving through pain"]
    }),
    "Slow Breathing Cooldown": carriefitIllustration({
      sourceExercise: "Seated slow breathing cooldown",
      mediaCollection: "generated",
      media: "slow-breathing-female.gif",
      mediaAlt: "Looping female demonstration of relaxed seated breathing with the hands around the lower ribs",
      primaryMuscles: ["Diaphragm"],
      secondaryMuscles: ["Rib cage", "Pelvic floor"],
      equipment: ["Exercise mat or comfortable floor space"],
      commonMistakes: ["Shrugging the shoulders", "Forcing a very large breath", "Holding the breath", "Tensing the jaw"]
    }),
    "Post-Workout Stretch": carriefitIllustration({
      sourceExercise: "Chest, hamstring and hip-flexor cooldown sequence",
      mediaCollection: "generated",
      media: "post-workout-stretch-female.gif",
      mediaAlt: "Looping female post-workout sequence demonstrating chest and shoulder mobility, supported hamstring stretching, and half-kneeling hip-flexor mobility",
      primaryMuscles: ["Chest", "Hamstrings", "Hip flexors"],
      secondaryMuscles: ["Shoulders", "Hips"],
      equipment: ["Clear wall space", "Stable bench", "Exercise mat"],
      commonMistakes: ["Bouncing", "Forcing range", "Rounding during the hamstring hinge", "Ignoring sharp pain or numbness"]
    }),
    "Arm Circles": carriefitIllustration({
      sourceExercise: "Standing bodyweight arm circles",
      media: "arm-circles-posture.webp",
      mediaAlt: "Front-view illustration of a tall standing arm-circle posture with both arms extended at shoulder height and red circular motion arrows around the hands",
      primaryMuscles: ["Shoulders"],
      secondaryMuscles: ["Upper back"],
      equipment: ["No equipment"],
      commonMistakes: ["Shrugging the shoulders", "Lowering the arms below shoulder height", "Moving too quickly or forcing the range"]
    }),
    "Bodyweight Squat": carriefitIllustration({
      sourceExercise: "Standing bodyweight squat",
      media: "bodyweight-squat-posture.webp",
      mediaAlt: "Side-by-side illustration of a tall bodyweight-squat start and a controlled parallel-depth squat with heels planted, knees tracking over the toes, and arms extended forward",
      primaryMuscles: ["Quadriceps", "Glutes"],
      secondaryMuscles: ["Hips", "Core", "Ankles"],
      equipment: ["No equipment"],
      commonMistakes: ["Letting the knees collapse inward", "Lifting the heels", "Rounding the back or forcing excessive depth"]
    }),
    "Cable Hammer Curl": carriefitIllustration({
      sourceExercise: "Rope cable hammer curl on a red cage-style Smith machine",
      media: "cable-hammer-curl-red-cage.webp",
      mediaAlt: "Start and finish positions for a neutral-grip rope hammer curl, with the athlete facing the same single front post and its low pulley on a red cage-style Smith machine",
      primaryMuscles: ["Biceps", "Brachialis"],
      secondaryMuscles: ["Forearms"],
      equipment: ["Red cage-style Smith machine", "One low inner front-left pulley", "Triceps rope"],
      commonMistakes: ["Swinging the torso", "Letting the elbows travel forward", "Changing from a neutral grip"]
    }),
    "Incline Cable Press": carriefitIllustration({
      sourceExercise: "Incline cable press in a cage-style Smith machine",
      media: "incline-cable-press-cage.webp",
      mediaAlt: "Start and finish positions for an incline cable press inside a red cage-style Smith machine, with cables running from low pulleys on both front posts",
      primaryMuscles: ["Upper chest"],
      secondaryMuscles: ["Front shoulders", "Triceps"],
      equipment: ["Red cage-style Smith machine", "Two low front-post pulleys", "Two D-handles", "Low-incline bench"],
      commonMistakes: ["Setting the pulleys too high", "Shrugging the shoulders", "Overarching the lower back"]
    }),
    "Lat Pulldown": carriefitIllustration({
      sourceExercise: "Seated lat pulldown on a red cage-style Smith machine",
      media: "lat-pulldown-red-cage.webp",
      mediaAlt: "Start and finish positions for a seated lat pulldown on a red cage-style Smith machine, using both high front-post pulleys and bringing the wide bar toward the upper chest",
      primaryMuscles: ["Lats", "Upper back"],
      secondaryMuscles: ["Biceps"],
      equipment: ["Red cage-style Smith machine", "Two high front-post pulleys", "Wide lat bar", "Upright bench"],
      commonMistakes: ["Pulling the bar behind the neck", "Swinging the torso backward", "Shrugging the shoulders"]
    }),
    "Hip Hinge": carriefitIllustration({
      sourceExercise: "Bodyweight hip hinge posture",
      media: "hip-hinge-posture.webp",
      mediaAlt: "Side-by-side illustration of a standing start and a hip hinge with soft knees, hips pushed backward, and a long neutral spine",
      primaryMuscles: ["Hamstrings", "Glutes"],
      secondaryMuscles: ["Core", "Back extensors"],
      equipment: ["No equipment"],
      commonMistakes: ["Turning the hinge into a squat", "Rounding the back", "Shifting weight onto the toes"]
    }),
    "Treadmill Walk": carriefitIllustration({
      sourceExercise: "Treadmill walking posture",
      media: "treadmill-easy-walk.gif",
      mediaCollection: "generated",
      mediaAlt: "Looping side-view demonstration of a woman walking upright on a treadmill with relaxed shoulders, free arms, and the safety clip attached",
      primaryMuscles: ["Legs", "Cardiovascular system"],
      secondaryMuscles: ["Core", "Postural muscles"],
      equipment: ["Treadmill", "Safety clip"],
      commonMistakes: ["Leaning on the console", "Holding the rails continuously", "Taking overly long strides"]
    }),
    "Easy Treadmill Cooldown": carriefitIllustration({
      sourceExercise: "Easy treadmill cooldown posture",
      media: "treadmill-easy-walk.gif",
      mediaCollection: "generated",
      mediaAlt: "Looping side-view demonstration of a woman taking an easy upright treadmill walk with the safety clip attached",
      primaryMuscles: ["Legs", "Cardiovascular system"],
      secondaryMuscles: ["Core", "Postural muscles"],
      equipment: ["Treadmill", "Safety clip"],
      commonMistakes: ["Stopping abruptly at a high speed", "Leaning on the console", "Stepping off before the belt stops"]
    }),
    "Incline Treadmill Walk": carriefitIllustration({
      sourceExercise: "Incline treadmill walking posture",
      media: "treadmill-incline-walk.gif",
      mediaCollection: "generated",
      mediaAlt: "Looping side-view demonstration of a woman walking on an inclined treadmill with short controlled steps, free arms, and the safety clip attached",
      primaryMuscles: ["Glutes", "Hamstrings", "Calves", "Cardiovascular system"],
      secondaryMuscles: ["Core", "Postural muscles"],
      equipment: ["Treadmill", "Safety clip"],
      commonMistakes: ["Leaning on the console", "Bending forward at the waist", "Taking overly long steps"]
    }),
    "Treadmill HIIT Intervals": carriefitIllustration({
      sourceExercise: "Controlled treadmill running intervals",
      media: "treadmill-hiit-interval.gif",
      mediaCollection: "generated",
      mediaAlt: "Looping side-view demonstration of a woman running controlled treadmill intervals with feet landing beneath the hips and the safety clip attached",
      primaryMuscles: ["Legs", "Cardiovascular system"],
      secondaryMuscles: ["Core", "Postural muscles"],
      equipment: ["Treadmill", "Safety clip"],
      commonMistakes: ["Overstriding", "Holding the rails", "Skipping the warm-up or cooldown"]
    }),
    "Cable Chest Press": ritfit({
      sourceExercise: "Chest Press",
      sourceDocument: "M1-C Workout Poster",
      media: "cable-chest-press.webp",
      mediaAlt: "RitFit chest press start and finish positions",
      primaryMuscles: ["Chest"],
      secondaryMuscles: ["Front shoulders", "Triceps"],
      equipment: ["RitFit M1", "Two D-handles"],
      commonMistakes: ["Shrugging the shoulders", "Arching the lower back", "Letting the elbows flare too high"]
    }),
    "Seated Cable Row": ritfit({
      sourceExercise: "Seated Row",
      sourceDocument: "BPC06 Workout Poster",
      media: "seated-cable-row.webp",
      mediaAlt: "RitFit seated cable row start and finish positions",
      primaryMuscles: ["Mid-back", "Lats"],
      secondaryMuscles: ["Rear shoulders", "Biceps"],
      equipment: ["RitFit cable station", "Row handle", "Bench"],
      commonMistakes: ["Rounding the back", "Leaning far backward", "Pulling with shrugged shoulders"]
    }),
    "Cable Shoulder Press": ritfit({
      sourceExercise: "Seated Vertical Bench Press",
      sourceDocument: "BPC06 Workout Poster",
      media: "cable-shoulder-press.webp",
      mediaAlt: "RitFit seated cable shoulder press start and finish positions",
      primaryMuscles: ["Shoulders"],
      secondaryMuscles: ["Triceps", "Upper chest"],
      equipment: ["RitFit cable station", "Two D-handles", "Upright bench"],
      commonMistakes: ["Using a straight bar", "Allowing a cable to cross the back", "Overarching the lower back"]
    }),
    "Rope Triceps Pushdown": {
      sourceType: "licensed-community",
      provider: "wger Workout Manager",
      providerUrl: "https://wger.de/",
      sourceExercise: "Tricep Pushdown on Cable",
      sourceExerciseId: 805,
      sourceUrl: "https://wger.de/en/exercise/805/view",
      author: "cshep442",
      media: "assets/exercise-library/wger/triceps-pushdown.webp",
      mediaAlt: "Start and finish positions for a cable rope triceps pushdown",
      primaryMuscles: ["Triceps"],
      secondaryMuscles: [],
      equipment: ["RitFit cable station", "Rope attachment"],
      commonMistakes: ["Letting the elbows drift forward", "Moving the shoulders or torso", "Snapping into elbow lockout"],
      license: wgerLicense
    },
    "Cable Curl": ritfit({
      sourceExercise: "Curl",
      sourceDocument: "M1-C Workout Poster",
      media: "cable-curl.webp",
      mediaAlt: "RitFit cable curl start and finish positions",
      primaryMuscles: ["Biceps"],
      secondaryMuscles: ["Forearms"],
      equipment: ["RitFit M1", "Short straight bar"],
      commonMistakes: ["Changing grip during the set", "Swinging the torso", "Allowing the elbows to travel forward"]
    }),
    "Smith Machine Squat": ritfit({
      sourceExercise: "Barbell Squat",
      sourceDocument: "M1-C Workout Poster",
      media: "smith-machine-squat.webp",
      mediaAlt: "RitFit squat standing and bottom positions",
      primaryMuscles: ["Quadriceps", "Glutes"],
      secondaryMuscles: ["Hamstrings", "Core"],
      equipment: ["RitFit M1 Smith station"],
      commonMistakes: ["Letting the knees collapse inward", "Lifting the heels", "Descending below a controllable depth"]
    }),
    "Smith Machine RDL": ritfit({
      sourceExercise: "Romanian Deadlift",
      sourceDocument: "M1-C Workout Poster",
      media: "smith-machine-rdl.webp",
      mediaAlt: "RitFit Romanian deadlift start and finish positions",
      primaryMuscles: ["Hamstrings", "Glutes"],
      secondaryMuscles: ["Back extensors", "Core"],
      equipment: ["RitFit M1 Smith station"],
      commonMistakes: ["Turning the hinge into a squat", "Rounding the back", "Letting the bar drift away from the legs"]
    }),
    "Smith Bulgarian Split Squat": {
      sourceType: "licensed-community",
      provider: "wger Workout Manager",
      providerUrl: "https://wger.de/",
      sourceExercise: "Smith Machine Split Squat",
      sourceExerciseId: 1593,
      sourceUrl: "https://wger.de/en/exercise/1593/view",
      originalSourceUrl: "https://www.docteur-fitness.com/split-squat-a-la-smith-machine",
      author: "workout@rooven.anonaddy.me",
      media: "assets/exercise-library/wger/smith-split-squat.gif",
      mediaAlt: "Looping Smith machine split squat demonstration",
      primaryMuscles: ["Quadriceps", "Glutes"],
      secondaryMuscles: ["Hamstrings", "Core"],
      equipment: ["RitFit M1 Smith station", "Bench"],
      commonMistakes: ["Using a stance that is too short", "Letting the front knee cave inward", "Pushing primarily through the rear foot"],
      license: wgerLicense
    },
    "Smith Machine Calf Raise": ritfit({
      sourceExercise: "Barbell Calf Raise",
      sourceDocument: "M1-C Workout Poster",
      media: "smith-machine-calf-raise.webp",
      mediaAlt: "RitFit calf raise bottom and top positions",
      primaryMuscles: ["Calves"],
      secondaryMuscles: ["Foot and ankle stabilizers"],
      equipment: ["RitFit M1 Smith station"],
      commonMistakes: ["Bouncing through the repetitions", "Rolling the ankles outward", "Using a shortened range of motion"]
    }),
    "Single Arm Cable Row": ritfit({
      sourceExercise: "Single Arm Row",
      sourceDocument: "BPC06 Workout Poster",
      media: "single-arm-cable-row.webp",
      mediaAlt: "RitFit single-arm cable row start and finish positions",
      primaryMuscles: ["Lats", "Mid-back"],
      secondaryMuscles: ["Biceps", "Rear shoulders", "Core"],
      equipment: ["RitFit cable station", "One D-handle"],
      commonMistakes: ["Twisting the torso", "Shrugging the working shoulder", "Jerking the handle"]
    }),
    "Cable Lateral Raise": ritfit({
      sourceExercise: "Crossover Lateral Raise",
      sourceDocument: "BPC06 Workout Poster",
      media: "cable-lateral-raise.webp",
      mediaAlt: "RitFit cable lateral raise start and finish positions",
      primaryMuscles: ["Side shoulders"],
      secondaryMuscles: ["Upper traps"],
      equipment: ["RitFit cable station", "Two D-handles"],
      commonMistakes: ["Shrugging toward the ears", "Swinging the weights", "Raising the hands far above shoulder height"]
    }),
    "Cable Crunch": ritfit({
      sourceExercise: "Ab Crunch",
      sourceDocument: "M1-C Workout Poster",
      media: "cable-crunch.webp",
      mediaAlt: "RitFit kneeling cable crunch start and finish positions",
      primaryMuscles: ["Abdominals"],
      secondaryMuscles: ["Obliques"],
      equipment: ["RitFit M1", "Rope attachment"],
      commonMistakes: ["Hinging only at the hips", "Pulling with the arms", "Letting the weight pull the lower back into extension"]
    }),
    "Rear Delt Cable Fly": ritfit({
      sourceExercise: "Reverse Fly",
      sourceDocument: "BPC06 Workout Poster",
      media: "rear-delt-cable-fly.webp",
      mediaAlt: "RitFit reverse cable fly start and finish positions",
      primaryMuscles: ["Rear shoulders"],
      secondaryMuscles: ["Upper back"],
      equipment: ["RitFit cable station", "Two D-handles"],
      commonMistakes: ["Shrugging the shoulders", "Using momentum", "Turning the exercise into a row"]
    }),
    "Cable Face Pull": ritfit({
      sourceExercise: "Face Pull",
      sourceDocument: "BPC06 Workout Poster",
      media: "cable-face-pull.webp",
      mediaAlt: "RitFit face pull start and finish positions",
      primaryMuscles: ["Rear shoulders", "Upper back"],
      secondaryMuscles: ["Rotator cuff", "Biceps"],
      equipment: ["RitFit cable station", "Rope attachment"],
      commonMistakes: ["Pulling toward the chest instead of the face", "Flaring the ribs", "Shrugging the shoulders"]
    }),
    "Cable Straight Arm Pushdown": ritfit({
      sourceExercise: "Lat Pushdown",
      sourceDocument: "M1-C Workout Poster",
      media: "straight-arm-pulldown.webp",
      mediaAlt: "RitFit straight-arm lat pushdown start and finish positions",
      primaryMuscles: ["Lats"],
      secondaryMuscles: ["Triceps", "Core"],
      equipment: ["RitFit M1", "Straight bar"],
      commonMistakes: ["Turning it into a triceps pushdown", "Rounding the back", "Using body momentum"]
    }),
    "High to Low Cable Chop": ritfit({
      sourceExercise: "Wood Chop",
      sourceDocument: "M1-C Workout Poster",
      media: "high-to-low-cable-chop.webp",
      mediaAlt: "RitFit high-to-low cable wood chop start and finish positions",
      primaryMuscles: ["Obliques", "Abdominals"],
      secondaryMuscles: ["Shoulders", "Hips"],
      equipment: ["RitFit M1", "D-handle"],
      commonMistakes: ["Pulling only with the arms", "Twisting through the knees", "Moving too quickly to control the return"]
    }),
    "Hip Flexor Mobility": carriefitIllustration({
      sourceExercise: "Half-kneeling hip flexor mobility stretch",
      media: "hip-flexor-mobility.gif",
      mediaCollection: "generated",
      mediaAlt: "Looping side-view demonstration of a woman moving from a tall half-kneeling start into a small controlled forward hip shift with the rear knee supported on a mat",
      primaryMuscles: ["Hip flexors"],
      secondaryMuscles: ["Quadriceps"],
      equipment: ["Exercise mat"],
      commonMistakes: ["Arching the lower back", "Leaning the torso instead of shifting the hips", "Forcing a deep or painful lunge"]
    }),
    "Hamstring Mobility": carriefitIllustration({
      sourceExercise: "Supported standing hamstring mobility stretch",
      media: "hamstring-mobility.gif",
      mediaCollection: "generated",
      mediaAlt: "Looping side-view demonstration of a woman moving from a tall supported stance with one heel on a low bench into a controlled long-spine hip hinge",
      primaryMuscles: ["Hamstrings"],
      secondaryMuscles: ["Calves"],
      equipment: ["Low bench or stable platform"],
      commonMistakes: ["Rounding the back", "Bouncing into the stretch", "Locking the standing knee or forcing a painful range"]
    }),
    "Chest and Shoulder Mobility": carriefitIllustration({
      sourceExercise: "Standing wall slide from W to Y",
      media: "chest-shoulder-mobility.gif",
      mediaCollection: "generated",
      mediaAlt: "Looping front-view demonstration of a woman performing a supported wall slide from a bent-elbow W position to a comfortable overhead Y without shrugging or arching the back",
      primaryMuscles: ["Shoulders", "Upper back"],
      secondaryMuscles: ["Chest", "Serratus anterior"],
      equipment: ["Clear wall"],
      commonMistakes: ["Arching the lower back", "Shrugging the shoulders", "Forcing the hands or elbows against the wall"]
    })
  };

  root.CARRIEFIT_EXERCISE_LIBRARY = Object.freeze({
    provider: "RitFit official posters with reviewed wger fallbacks",
    providerUrl: "https://www.ritfitsports.com/",
    reviewedOn: "2026-07-29",
    entries: Object.freeze(entries)
  });
})(typeof self !== "undefined" ? self : window);
