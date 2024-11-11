// PUT update release
    test('METHOD PUT - should update a release', async () => {
        const newRelease = await releases.create({
            user_id: 1,
            title: "Test Game",
            relese_date: "2024-12-25",
            rating: "E",
            image_url: "test.jpg",
            month: "December"
        }) as any;

        const response = await request(app)
            .put(`/api/releases/${newRelease.get('id')}`)
            .send({
                title: "Updated Test Game"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toBe(1);
    });

    // DELETE release
    test('METHOD DELETE - should delete a release', async () => {
        const newRelease = await releases.create({
            user_id: 1,
            title: "Test Game",
            relese_date: "2024-12-25",
            rating: "E",
            image_url: "test.jpg",
            month: "December"
        }) as any;

        const response = await request(app)
            .delete(`/api/releases/${newRelease.get('id')}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toContain('eliminado correctamente');
    });
