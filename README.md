# CPSC 304 Project Group 90 - 2023 Winter Session Term 1 (Sept-Dec)

| Name         | Student Number | CS Aliases (Userid) | Preferred E-mail Address  |
|--------------|----------------|---------------------|---------------------------|
| Brandon Yuen | 40390817       | i8w2b               | brandonyuen2001@gmail.com |
| Celine Chen  | 44176873       | g4l8c               | celinechen1114@gmail.com  |
| Joshua Chew  | 95081204       | u9b3b               | joshuagchew@gmail.com     |


## Project Summary
The domain of this application is the entertainment industry, specifically focused on Disney Resorts. It encompasses various aspects of providing information to guests about these resorts, their residing theme parks, and the smaller themed “lands” within those. This database will facilitate the efficient management of guest information, merchandise, food, and attractions found in each resort, such as rides and shows.

### [Milestone 1](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/Milestone%201.pdf)
### [Milestone 2](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/Milestone%202.pdf)
### [Milestone 3](https://github.students.cs.ubc.ca/CPSC304-2023W-T1/project_g4l8c_i8w2b_u9b3b/blob/main/docs/Milestone%203.md)

## [Deployment Guide](https://www.students.cs.ubc.ca/~cs-304/resources/javascript-oracle-resources/node-setup.html)

1. `ssh remote`
2. navigate to project repo directory
3. `sh ./remote-start.sh`
4. open new terminal
5. navigate to project repo directory
6. build tunnel to remote node application
    - Mac users:
      - `sh ./scripts/mac/server-tunnel.sh`
    - Windows users:
      - `.\scripts\win\server-tunnel.cmd`

## Killing the Server
1. open server tunnel
2. `lsof -i`
3. identify your server processes (name should match port specified when building server, command should be 'node')
4. note the associated PIDs
5. `kill <pid>`
